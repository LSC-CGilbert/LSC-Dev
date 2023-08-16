<?php
/**
 * BrandCrock Industryarc Plugin for Industryarc Theme in Magento2
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the GNU General Public License
 *
 * DISCLAIMER
 *
 * Do not add or edit the files if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category   BrandCrock
 * @package    BrandCrock_Industryarc
 * @copyright  Copyright (c) BrandCrock (https://www.brandcrock.com/)
 * @license    GNU General Public License
 */
namespace BrandCrock\Industryarc\Model\Block;

class Converter
{
    /**
     * @var \Magento\Catalog\Model\ResourceModel\Category\CollectionFactory
     */
    protected $categoryFactory;

    /**
     * @var \Magento\Catalog\Model\ResourceModel\Product\Attribute\CollectionFactory
     */
    protected $attCollectionFact;

    /**
     * @var \Magento\Eav\Model\ResourceModel\Entity\Attribute\Option\CollectionFactory
     */
    protected $attOptCollectionFact;

    /**
     * @var array
     */
    protected $attCodeOptPair;

    /**
     * @var array
     */
    protected $attCodeOptValIdPair;

    /**
     * @var \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory
     */
    protected $productCollectFact;

    /**
     * @param \Magento\Catalog\Model\ResourceModel\Category\CollectionFactory $categoryFactory
     * @param \Magento\Catalog\Model\ResourceModel\Product\Attribute\CollectionFactory $attCollectionFact
     * @param \Magento\Eav\Model\ResourceModel\Entity\Attribute\Option\CollectionFactory $attOptCollectionFact
     * @param \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectFact
     */
    public function __construct(
        \Magento\Catalog\Model\ResourceModel\Category\CollectionFactory $categoryFactory,
        \Magento\Catalog\Model\ResourceModel\Product\Attribute\CollectionFactory $attCollectionFact,
        \Magento\Eav\Model\ResourceModel\Entity\Attribute\Option\CollectionFactory $attOptCollectionFact,
        \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectFact
    ) {
        $this->categoryFactory = $categoryFactory;
        $this->attCollectionFact = $attCollectionFact;
        $this->attOptCollectionFact = $attOptCollectionFact;
        $this->productCollectFact = $productCollectFact;
    }

    /**
     * Convert CSV format row to array
     *
     * @param array $row
     * @return array
     */
    public function convertRow($row)
    {
        $data = [];
        foreach ($row as $field => $value) {
            if ('content' == $field) {
                $data['block'][$field] = $this->replaceMatches($value);
                continue;
            }
            $data['block'][$field] = $value;
        }
        return $data;
    }

    /**
     * Get category by url
     *
     * @param string $urlKey
     * @return \Magento\Framework\Object
     */
    protected function getCategoryByUrlKey($urlKey)
    {
        $category = $this->categoryFactory->create()
            ->addAttributeToFilter('url_key', $urlKey)
            ->addUrlRewriteToResult()
            ->getFirstItem();
        return $category;
    }

    /**
     * Get formatted array value
     *
     * @param mixed $value
     * @param string $separator
     * @return array
     */
    protected function getArrayValue($value, $separator = "/")
    {
        if (is_array($value)) {
            return $value;
        }
        if (false !== strpos($value, $separator)) {
            $value = array_filter(explode($separator, $value));
        }
        return !is_array($value) ? [$value] : $value;
    }

    /**
     * Replace matches
     *
     * @param string $content
     * @return mixed
     */
    protected function replaceMatches($content)
    {
        $matches = $this->getMatches($content);
        if (!empty($matches['value'])) {
            $replaces = $this->getReplaces($matches);
            $content = preg_replace($replaces['regexp'], $replaces['value'], $content);
        }
        return $content;
    }

    /**
     * Get matches
     *
     * @param string $content
     * @return array
     */
    protected function getMatches($content)
    {
        $regexp = '/{{(category[^ ]*) key="([^"]+)"}}/';
        preg_match_all($regexp, $content, $matchesCategory);
        $regexp = '/{{(product[^ ]*) sku="([^"]+)"}}/';
        preg_match_all($regexp, $content, $matchesProduct);
        $regexp = '/{{(attribute) key="([^"]*)"}}/';
        preg_match_all($regexp, $content, $matchesAttribute);
        return [
            'type' => $matchesCategory[1] + $matchesAttribute[1] + $matchesProduct[1],
            'value' => $matchesCategory[2] + $matchesAttribute[2] + $matchesProduct[2]
        ];
    }

    /**
     * Get replaces
     *
     * @param array $matches
     * @return array
     */
    protected function getReplaces($matches)
    {
        $replaceData = [];

        foreach ($matches['value'] as $matchKey => $matchValue) {
            $callback = "matcher" . ucfirst(trim($matches['type'][$matchKey]));
            $matchResult = call_user_func_array([$this, $callback], [$matchValue]);
            if (!empty($matchResult)) {
                $replaceData = array_merge_recursive($replaceData, $matchResult);
            }
        }
        return $replaceData;
    }

    /**
     * Get url filter
     *
     * @param string $urlAttributes
     * @return string
     */
    protected function getUrlFilter($urlAttributes)
    {
        $separatedAttributes = $this->getArrayValue($urlAttributes, ';');
        $urlFilter = null;
        foreach ($separatedAttributes as $attributeNumber => $attributeValue) {
            $attributeData = $this->getArrayValue($attributeValue, '=');
            $attributeOptions = $this->productConverter->getAttributeOptions($attributeData[0]);
            $attributeValue = $attributeOptions->getItemByColumnValue('value', $attributeData[1]);
            if ($attributeNumber == 0) {
                $urlFilter = $attributeData[0] . '=' . $attributeValue->getId();
                continue;
            }
            $urlFilter .= '&' . $attributeData[0] . '=' . $attributeValue->getId();
        }
        return $urlFilter;
    }

    /**
     * Get attribute options by attribute code
     *
     * @param string $attributeCode
     * @return \Magento\Eav\Model\ResourceModel\Entity\Attribute\Option\Collection|null
     */
    protected function getAttributeOptions($attributeCode)
    {
        if (!$this->attCodeOptPair || !isset($this->attCodeOptPair[$attributeCode])) {
            $this->loadAttributeOptions($attributeCode);
        }
        return isset($this->attCodeOptPair[$attributeCode])
            ? $this->attCodeOptPair[$attributeCode]
            : null;
    }

    /**
     * Loads all attributes with options for attribute
     *
     * @param string $attributeCode
     * @return $this
     */
    protected function loadAttributeOptions($attributeCode)
    {
        /** @var \Magento\Catalog\Model\ResourceModel\Product\Attribute\Collection $collection */
        $collection = $this->attCollectionFact->create();
        $collection->addFieldToSelect(['attribute_code', 'attribute_id']);
        $collection->addFieldToFilter('attribute_code', $attributeCode);
        $collection->setFrontendInputTypeFilter(['in' => ['select', 'multiselect']]);
        foreach ($collection as $item) {
            $options = $this->attOptCollectionFact->create()
                ->setAttributeFilter($item->getAttributeId())->setPositionOrder('asc', true)->load();
            $this->attCodeOptPair[$item->getAttributeCode()] = $options;
        }
        return $this;
    }

    /**
     * Find attribute option value pair
     *
     * @param string $attributeCode
     * @param string $value
     * @return mixed
     */
    protected function getAttributeOptionValueId($attributeCode, $value)
    {
        if (!empty($this->attCodeOptValIdPair[$attributeCode][$value])) {
            return $this->attCodeOptValIdPair[$attributeCode][$value];
        }

        $options = $this->getAttributeOptions($attributeCode);
        $opt = [];
        if ($options) {
            foreach ($options as $option) {
                $opt[$option->getValue()] = $option->getId();
            }
        }
        $this->attCodeOptValIdPair[$attributeCode] = $opt;
        return $this->attCodeOptValIdPair[$attributeCode][$value];
    }

    /**
     * Match categoey
     *
     * @param string $matchValue
     * @return array
     */
    protected function matcherCategory($matchValue)
    {
        $replaceData = [];
        $category = $this->getCategoryByUrlKey($matchValue);
        if (!empty($category)) {
            $categoryUrl = $category->getRequestPath();
            $replaceData['regexp'][] = '/{{category key="' . $matchValue . '"}}/';
            $replaceData['value'][] = '{{store url=""}}' . $categoryUrl;
        }
        return $replaceData;
    }

    /**
     * Match Category Id
     *
     * @param string $matchValue
     * @return array
     */
    protected function matcherCategoryId($matchValue)
    {
        $replaceData = [];
        $category = $this->getCategoryByUrlKey($matchValue);
        if (!empty($category)) {
            $replaceData['regexp'][] = '/{{categoryId key="' . $matchValue . '"}}/';
            $replaceData['value'][] = sprintf('%03d', $category->getId());
        }
        return $replaceData;
    }

    /**
     * Match product
     *
     * @param string $matchValue
     * @return array
     */
    protected function matcherProduct($matchValue)
    {
        $replaceData = [];
        $productCollection = $this->productCollectFact->create();
        $productItem = $productCollection->addAttributeToFilter('sku', $matchValue)
            ->addUrlRewrite()
            ->getFirstItem();
        $productUrl = null;
        if ($productItem) {
            $productUrl = '{{store url=""}}' .  $productItem->getRequestPath();
        }
        $replaceData['regexp'][] = '/{{product sku="' . $matchValue . '"}}/';
        $replaceData['value'][] = $productUrl;
        return $replaceData;
    }

    /**
     * Match attribute
     *
     * @param string $matchValue
     * @return array
     */
    protected function matcherAttribute($matchValue)
    {
        $replaceData = [];
        if (strpos($matchValue, ':') === false) {
            return $replaceData;
        }
        list($code, $value) = explode(':', $matchValue);

        if (!empty($code) && !empty($value)) {
            $replaceData['regexp'][] = '/{{attribute key="' . $matchValue . '"}}/';
            $replaceData['value'][] = sprintf('%03d', $this->getAttributeOptionValueId($code, $value));
        }
        return $replaceData;
    }
}
