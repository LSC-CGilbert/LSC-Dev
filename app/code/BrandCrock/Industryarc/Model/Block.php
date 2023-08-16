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
namespace BrandCrock\Industryarc\Model;

use Magento\Framework\Setup\SampleData\Context as SampleDataContext;
use Magento\Framework\Filesystem\Io\File;

class Block
{
    /**
     * @var \Magento\Framework\Setup\SampleData\FixtureManager
     */
    private $fixtureManager;

    /**
     * @var \Magento\Framework\File\Csv
     */
    protected $csvReader;

    /**
     * @var \Magento\Cms\Model\BlockFactory
     */
    protected $blockFactory;

    /**
     * @var Block\Converter
     */
    protected $converter;

    /**
     * @var \Magento\Catalog\Api\CategoryRepositoryInterface
     */
    protected $categoryRepository;

    /**
     * @var \Magento\Theme\Model\ResourceModel\Theme\CollectionFactory
     */
    private $collectionFactory;

    /**
     * @var \Magento\Widget\Model\Widget\InstanceFactory
     */
    private $widgetFactory;

    /**
     * @var File
     */
    private $file;

    /**
     * Constructor
     *
     * @param SampleDataContext $sampleDataContext
     * @param \Magento\Cms\Model\BlockFactory $blockFactory
     * @param Block\Converter $converter
     * @param \Magento\Catalog\Api\CategoryRepositoryInterface $categoryRepository
     * @param \Magento\Theme\Model\ResourceModel\Theme\CollectionFactory $collectionFactory
     * @param \Magento\Widget\Model\Widget\InstanceFactory $widgetFactory
     * @param File $file
     */
    public function __construct(
        SampleDataContext $sampleDataContext,
        \Magento\Cms\Model\BlockFactory $blockFactory,
        Block\Converter $converter,
        \Magento\Catalog\Api\CategoryRepositoryInterface $categoryRepository,
        \Magento\Theme\Model\ResourceModel\Theme\CollectionFactory $collectionFactory,
        \Magento\Widget\Model\Widget\InstanceFactory $widgetFactory,
        File $file
    ) {
        $this->fixtureManager = $sampleDataContext->getFixtureManager();
        $this->csvReader = $sampleDataContext->getCsvReader();
        $this->blockFactory = $blockFactory;
        $this->converter = $converter;
        $this->categoryRepository = $categoryRepository;
        $this->collectionFactory = $collectionFactory;
        $this->widgetFactory = $widgetFactory;
        $this->file = $file;
    }

    /**
     * Install
     *
     * @param array $fixtures
     * @return void
     */
    public function install(array $fixtures)
    {
        $themeList = $this->collectionFactory->create();
        $themeId = 0;
        foreach ($themeList as $theme) {
            $themeTitle = $theme->getThemeTitle();
            
            if ($themeTitle == "BrandCrock Industryarc") {
                $themeId = $theme->getId();
            }
        }
        if ($themeId == 0) {
            $themeId = count($themeList) + 1;
        }
        
        foreach ($fixtures as $fileName) {
            $fileName = $this->fixtureManager->getFixture($fileName);
            if (!$this->file->fileExists($fileName)) {
                continue;
            }
            $rows = $this->csvReader->getData($fileName);
            $header = array_shift($rows);

            foreach ($rows as $row) {
                $data = [];
                foreach ($row as $key => $value) {
                    $data[$header[$key]] = $value;
                }
                $row = $data;
                $data = $this->converter->convertRow($row);
                $cmsBlock = $this->saveCmsBlock($data['block']);
                $this->createWidget($cmsBlock->getId(), $data['block']['title'], $themeId);
                $cmsBlock->unsetData();
            }
        }
    }

    /**
     * Create widget
     *
     * @param array $blockId
     * @param array $title
     * @param array $themeId
     * @return \Magento\Cms\Model\Block
     */
    protected function createWidget($blockId, $title, $themeId)
    {
        $widgetFactory = $this->widgetFactory->create();
        $widgetData = [];

        $widgetData['instance_type'] = 'Magento\Cms\Block\Widget\Block';
        $widgetData['instance_code'] = 'cms_static_block';
        $widgetData['theme_id'] = $themeId;
        $widgetData['title'] = $title;
        $widgetData['store_ids'] = '0';
        $widgetData['widget_parameters'] = '{"block_id":"'.$blockId.'"}';
        $widgetData['sort_order'] = 0;
        
        $widgetFactory->setData($widgetData);
        $widgetFactory->save();
    }

    /**
     * Save cms block
     *
     * @param array $data
     * @return \Magento\Cms\Model\Block
     */
    protected function saveCmsBlock($data)
    {
        $cmsBlock = $this->blockFactory->create();
        $cmsBlock->load($data['identifier']);
        if (!$cmsBlock->getData()) {
            $cmsBlock->setData($data);
        } else {
            $cmsBlock->addData($data);
        }
        $cmsBlock->setStores([\Magento\Store\Model\Store::DEFAULT_STORE_ID]);
        $cmsBlock->setIsActive(1);
        $cmsBlock->save();
        return $cmsBlock;
    }

    /**
     * Set category landing page
     *
     * @param string $blockId
     * @param string $categoryId
     * @return void
     */
    protected function setCategoryLandingPage($blockId, $categoryId)
    {
        $categoryCms = [
            'landing_page' => $blockId,
            'display_mode' => 'PRODUCTS_AND_PAGE',
        ];
        if (!empty($categoryId)) {
            $category = $this->categoryRepository->get($categoryId);
            $category->setData($categoryCms);
            $this->categoryRepository->save($categoryId);
        }
    }
}
