<?php

namespace Meetanshi\ImageClean\Model\ResourceModel\Imageclean;

use Magento\Framework\Data\Collection\Db\FetchStrategyInterface;
use Magento\Framework\Data\Collection\EntityFactoryInterface;
use Magento\Framework\Event\ManagerInterface;
use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;
use Psr\Log\LoggerInterface;
use Magento\Catalog\Model\ProductFactory;
use Meetanshi\ImageClean\Helper\Data;
use Magento\Catalog\Model\ResourceModel\Product\CollectionFactory;

/**
 * Class Collection
 * @package Meetanshi\ImageClean\Model\ResourceModel\Imageclean
 */
class Collection extends AbstractCollection
{
    /**
     * @var string
     */
    protected $idFieldName = 'imageclean_id';
    /**
     * @var
     */
    protected $total;
    /**
     * @var ProductFactory
     */
    private $productFactory;
    /**
     * @var
     */
    protected $dateTime;
    /**
     * @var Data
     */
    protected $helper;
    /**
     * @var CollectionFactory
     */
    protected $productCollection;

    /**
     * Collection constructor.
     * @param EntityFactoryInterface $entityFactory
     * @param LoggerInterface $logger
     * @param FetchStrategyInterface $fetchStrategy
     * @param ManagerInterface $eventManager
     * @param ProductFactory $productFactory
     * @param Data $data
     * @param CollectionFactory $collectionFactory
     */
    public function __construct(
        EntityFactoryInterface $entityFactory,
        LoggerInterface $logger,
        FetchStrategyInterface $fetchStrategy,
        ManagerInterface $eventManager,
        ProductFactory $productFactory,
        Data $data,
        CollectionFactory $collectionFactory
    ) {

        $this->productFactory = $productFactory;
        $this->helper = $data;
        $this->productCollection = $collectionFactory;
        parent::__construct($entityFactory, $logger, $fetchStrategy, $eventManager);
    }

    /**
     *
     */
    public function _construct()
    {
        $this->_init(\Meetanshi\ImageClean\Model\Imageclean::class, \Meetanshi\ImageClean\Model\ResourceModel\Imageclean::class);
    }

    /**
     * @return array
     */
    public function getImages()
    {
        $ary = [];
        try {
            $edn = $this->helper->getVersion();
            $str = 'Community';
            // @codingStandardsIgnoreLine
            $pos = strpos($edn, $str);
            if ($pos !== false) {
                $ary = $this->isCEData();
            } else {
                $ary = $this->isEEData();
            }
        } catch (\Exception $e) {
            $this->helper->logger->info($e->getMessage());
        }
        return $ary;
    }

    public function isCEData()
    {
        $array = [];
        try {
            $this->setConnection($this->getResource()->getConnection());
            $this->getSelect()->from(
                ['main_table' => $this->getTable('catalog_product_entity_media_gallery')], '*')
                ->group(['value_id']);

            $this->getSelect()->joinLeft(
                ['gallery_value_to_entity' => $this->getTable('catalog_product_entity_media_gallery_value_to_entity')],
                'main_table.value_id = gallery_value_to_entity.value_id',
                ['entity_id']
            );

            $collection = $this->productCollection->create();
            $collection->addAttributeToSelect('entity_id');
            $collection->addAttributeToSelect('name');

            $pid = [];
            foreach ($collection as $product){
                $pid[$product->getData('entity_id')] = $product->getName();
            }

            foreach ($this->getData() as $item) {
                $used = 1;
                $imgName = str_replace('//','/',$item['value']);

                if (is_null($item['entity_id']) || empty($item['entity_id'])){
                    $used = 0;
                }
                if (array_key_exists($item['entity_id'],$pid)){
                    $array[$imgName] = array('used' => $used,'file' => $imgName,'productId' => $item['entity_id'],'product_name' => $pid[$item['entity_id']]);
                }else{
                    $array[$imgName] = array('used' => $used,'file' => $imgName,'productId' => $item['entity_id'],'product_name' => '');
                }
            }
        } catch (\Exception $e) {
            $this->helper->logger->info($e->getMessage());
        }
        return $array;
    }

    public function isEEData()
    {
        $array = [];
        try {
            $this->setConnection($this->getResource()->getConnection());
            $this->getSelect()->from(
                ['main_table' => $this->getTable('catalog_product_entity_media_gallery')], '*')
                ->group(['value_id']);

            $this->getSelect()->joinLeft(
                ['gallery_value_to_entity' => $this->getTable('catalog_product_entity_media_gallery_value_to_entity')],
                'main_table.value_id = gallery_value_to_entity.value_id',
                ['row_id']
            );

            $collection = $this->productCollection->create();
            $collection->addAttributeToSelect('entity_id');
            $collection->addAttributeToSelect('name');

            $pid = [];
            $pname = [];
            $pEId = [];
            foreach ($collection as $product){
                $pid[$product->getData('row_id')] = $product->getName();
                $pname[$product->getData('entity_id')] = $product->getName();
                $pEId[0][$product->getData('row_id')] = $product->getData('entity_id');
            }

            foreach ($this->getData() as $item) {
                $used = 1;
                $imgName = str_replace('//', '/', $item['value']);

                if (array_key_exists($item['row_id'],$pid)){
                    $productName = $pid[$item['row_id']];

                    if ($productName == null || $productName == ''){
                        $productName = $pname[$pEId[0][$item['row_id']]];
                    }

                    if ($item['row_id'] == $pEId[0][$item['row_id']]) {
                        $array[$imgName] = array('used' => $used, 'file' => $imgName, 'productId' => $item['row_id'], 'product_name' => $productName);
                    }else{
                        $array[$imgName] = array('used' => $used, 'file' => $imgName, 'productId' => $pEId[0][$item['row_id']], 'product_name' => $productName);
                    }
                }else{
                    $productName1 = null;
                    if (array_key_exists($item['row_id'],$pEId[0])){
                        $productName1 = $pname[$pEId[0][$item['row_id']]];
                    }
                    if ($productName1 == null || $productName1 == ''){
                        $product = $this->productFactory->create()->load($item['row_id']);
                        $productName1 = $product->getName();
                    }

                    if ($productName1 == null || $productName1 == ''){
                        $array[$imgName] = array('used' => 0, 'file' => $imgName, 'productId' => $item['row_id'], 'product_name' => $productName1);
                    }else {
                        $array[$imgName] = array('used' => $used, 'file' => $imgName, 'productId' => $item['row_id'], 'product_name' => $productName1);
                    }
                }
            }
        }catch (\Exception $e){
            $this->helper->logger->info($e->getMessage());
        }
        return $array;
    }
}
