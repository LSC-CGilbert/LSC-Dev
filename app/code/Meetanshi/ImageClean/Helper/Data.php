<?php

namespace Meetanshi\ImageClean\Helper;

use Meetanshi\ImageClean\Model\ImagecleanFactory;
use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\App\Helper\Context;
use Magento\Store\Model\StoreManagerInterface;
use Magento\Catalog\Model\ResourceModel\Category\CollectionFactory;
use Magento\Store\Model\ScopeInterface;
use Meetanshi\ImageClean\Model\ResourceModel\Imageclean\CollectionFactory as ImageCollection;
use Magento\Framework\App\ResourceConnection;
use Magento\Framework\Filesystem;
use Magento\Framework\App\Filesystem\DirectoryList;
use Magento\Framework\Filesystem\Driver\File;
use Psr\Log\LoggerInterface;
use Magento\Catalog\Model\ProductFactory;
use Magento\Catalog\Api\ProductRepositoryInterface;
use Meetanshi\ImageClean\Model\Imageclean;
use Magento\Catalog\Model\Product\Gallery\Processor;
use Magento\Catalog\Model\ResourceModel\Product\Gallery;
use Magento\Framework\Stdlib\DateTime\DateTime;
use Magento\Framework\App\State;
use Magento\Framework\App\Area;
use Magento\Framework\App\ProductMetadataInterface;

/**
 * Class Data
 * @package Meetanshi\ImageClean\Helper
 */
class Data extends AbstractHelper
{
    const RESOURCES = 'image_clean/general/resources';
    const MAX_IMAGES = 'image_clean/general/max_images';
    const START_TIME = 'image_clean/general/time';
    const SCHEDULE = 'image_clean/general/enable_schedule';
    const FREQUENCY = 'image_clean/general/frequency';

    /**
     * @var ImagecleanFactory
     */
    protected $modelImagecleanFactory;
    /**
     * @var CollectionFactory
     */
    protected $categoryCollectionFactory;
    /**
     * @var StoreManagerInterface
     */
    protected $storeManager;
    /**
     * @var
     */
    protected $imageCleanFactory;
    /**
     * @var array
     */
    protected $result = [];
    /**
     * @var
     */
    protected $mainTable;
    /**
     * @var array
     */
    public $valdir = [];
    /**
     * @var
     */
    protected $collectionFactory;
    /**
     * @var ImageCollection
     */
    protected $imageCollectionFactory;
    /**
     * @var LoggerInterface
     */
    public $logger;
    /**
     * @var File
     */
    private $file;
    /**
     * @var ResourceConnection
     */
    private $resourceConnection;
    /**
     * @var Filesystem
     */
    private $filesystem;
    /**
     * @var DirectoryList
     */
    private $directoryList;
    /**
     * @var ProductFactory
     */
    protected $productFactory;
    /**
     * @var ProductRepositoryInterface
     */
    protected $productRepository;
    /**
     * @var Imageclean
     */
    protected $imageClean;
    /**
     * @var Processor
     */
    protected $imageProcessor;
    /**
     * @var Gallery
     */
    protected $productGallery;
    /**
     * @var DateTime
     */
    public $dateTime;
    /**
     * @var State
     */
    protected $state;
    /**
     * @var ProductMetadataInterface
     */
    protected $productMetadata;

    /**
     * Data constructor.
     * @param Context $context
     * @param CollectionFactory $categoryCollectionFactory
     * @param StoreManagerInterface $StoreManagerInterface
     * @param ImagecleanFactory $modelImagecleanFactory
     * @param ImageCollection $imageCollectionFactory
     * @param ResourceConnection $resourceConnection
     * @param Filesystem $filesystem
     * @param DirectoryList $directoryList
     * @param File $file
     * @param LoggerInterface $logger
     * @param ProductFactory $productFactory
     * @param ProductRepositoryInterface $productRepository
     * @param Imageclean $imageclean
     * @param Processor $processor
     * @param Gallery $gallery
     * @param DateTime $dateTime
     * @param State $state
     * * @param ProductMetadataInterface $productMetadata
     */
    public function __construct(
        Context $context,
        CollectionFactory $categoryCollectionFactory,
        StoreManagerInterface $StoreManagerInterface,
        ImagecleanFactory $modelImagecleanFactory,
        ImageCollection $imageCollectionFactory,
        ResourceConnection $resourceConnection,
        Filesystem $filesystem,
        DirectoryList $directoryList,
        File $file,
        LoggerInterface $logger,
        ProductFactory $productFactory,
        ProductRepositoryInterface $productRepository,
        Imageclean $imageclean,
        Processor $processor,
        Gallery $gallery,
        DateTime $dateTime,
        State $state,
        ProductMetadataInterface $productMetadata
    )
    {
        $this->modelImagecleanFactory = $modelImagecleanFactory;
        $this->categoryCollectionFactory = $categoryCollectionFactory;
        $this->storeManager = $StoreManagerInterface;
        $this->imageCollectionFactory = $imageCollectionFactory;
        $this->resourceConnection = $resourceConnection;
        $this->filesystem = $filesystem;
        $this->directoryList = $directoryList;
        $this->file = $file;
        $this->logger = $logger;
        $this->productFactory = $productFactory;
        $this->productRepository = $productRepository;
        $this->imageClean = $imageclean;
        $this->imageProcessor = $processor;
        $this->productGallery = $gallery;
        $this->dateTime = $dateTime;
        $this->state = $state;
        $this->productMetadata = $productMetadata;
        parent::__construct($context);
    }

    /**
     * @return mixed
     */
    public function getFrequency(){
        return $this->scopeConfig->getValue(self::FREQUENCY, ScopeInterface::SCOPE_STORE);
    }

    /**
     * @return mixed
     */
    public function getMaxImages(){
        return $this->scopeConfig->getValue(self::MAX_IMAGES,ScopeInterface::SCOPE_STORE);
    }

    /**
     * @return mixed
     */
    public function getStartTime(){
        return $this->scopeConfig->getValue(self::START_TIME, ScopeInterface::SCOPE_STORE);
    }

    /**
     * @return mixed
     */
    public function isEnableSchedule(){
        return $this->scopeConfig->getValue(self::SCHEDULE, ScopeInterface::SCOPE_STORE);
    }

    /**
     * @return DateTime
     */
    public function getDateTime(){
        return $this->dateTime;
    }

    /**
     *
     */
    public function clearUsedImages(){
        try {
            $maxImages = $this->getMaxImages();
            $modeldb = $this->imageCollectionFactory->create()
                ->addFieldToFilter('isproduct', array('eq' => '1'))
                ->addFieldToFilter('used', array('eq' => '1'));

            $mediaDirectory = $this->filesystem->getDirectoryRead(DirectoryList::MEDIA);
            $mediaRootDir = $mediaDirectory->getAbsolutePath('catalog/product');
            $counter = 0;
            foreach ($modeldb as $image) {
                if ($image->getProductId() > 0) {
                    $product = $this->productFactory->create()->load($image->getProductId());
                    $images = $product->getMediaGalleryImages();
                    foreach($images as $child) {
                        $this->productGallery->deleteGallery($child->getValueId());
                        $this->imageProcessor->removeImage($product, $child->getFile());
                    }
                }
                if ($this->file->isExists($mediaRootDir . $image->getFilename())) {
                    $this->file->deleteFile($mediaRootDir . $image->getFilename());
                }
                $image->delete();
                $counter++;
                if ($counter > $maxImages){
                    break;
                }
            }
            $this->dbRecordClear();
        }catch (\Exception $e){
            $this->logger->info($e->getMessage());
        }
    }

    /**
     * @param $type
     */
    public function ClearUnusedImages($type)
    {
        try {
            $maxImages = $this->getMaxImages();

            if ($type == 'category') {
                $modeldb = $this->imageCollectionFactory->create()
                    ->addFieldToFilter('isproduct', array('eq' => '0'));

                $mediaDirectory = $this->filesystem->getDirectoryRead(DirectoryList::MEDIA);
                $mediaRootDir = $mediaDirectory->getAbsolutePath('catalog/category');
                $counter = 0;
                foreach ($modeldb as $image) {
                    if ($this->file->isExists($mediaRootDir . $image->getFilename())) {
                        $this->file->deleteFile($mediaRootDir . $image->getFilename());
                    }
                    $image->delete();
                    $counter++;
                    if ($counter > $maxImages){
                        break;
                    }
                }
            } elseif ($type == 'product') {
                $modeldb = $this->imageCollectionFactory->create()
                    ->addFieldToFilter('isproduct', array('eq' => '1'))
                    ->addFieldToFilter('used', array('eq' => '0'));

                $mediaDirectory = $this->filesystem->getDirectoryRead(DirectoryList::MEDIA);
                $mediaRootDir = $mediaDirectory->getAbsolutePath('catalog/product');
                $counter = 0;
                foreach ($modeldb as $image) {
                    if ($this->file->isExists($mediaRootDir . $image->getFilename())) {
                        $this->file->deleteFile($mediaRootDir . $image->getFilename());
                    }
                    $image->delete();
                    $counter++;
                    if ($counter > $maxImages){
                        break;
                    }
                }
            }
        } catch (\Exception $e) {
            $this->logger->info($e->getMessage());
        }
    }

    /**
     * @param int $counter
     */
    public function dbRecordClear($counter = 0){
        try{
            $maxImages = $this->getMaxImages();
            $mediaDir = $this->filesystem->getDirectoryWrite(DirectoryList::MEDIA);
            $connection = $this->resourceConnection->getConnection('core_write');
            $tableName = $this->resourceConnection->getTableName('catalog_product_entity_media_gallery');
            $result = $connection->fetchAll('SELECT * FROM ' . $tableName . ' where media_type = "image"');
            foreach ($result as $item) {
                $imagePath = $mediaDir->getAbsolutePath('catalog/product' . $item['value']);
                if (!$mediaDir->isExist($imagePath)) {
                    $sql = "Delete FROM " . $tableName . " Where value_id = " . $item['value_id'];
                    $connection->query($sql);
                }
                $counter++;
                if ($counter > $maxImages){
                    break;
                }
            }
        }catch (\Exception $e){
            $this->logger->info($e->getMessage());
        }
    }

    /**
     * @return bool
     */
    public function ConfigClear()
    {
        $resource = $this->scopeConfig->getValue(self::RESOURCES, ScopeInterface::SCOPE_STORE);
        $resources = explode(",", $resource);
        $maxImages = $this->getMaxImages();
        $counter = 0;
        try {
            if (in_array("unusedProduct", $resources)) {
                $modeldb = $this->imageCollectionFactory->create()
                    ->addFieldToFilter('isproduct', array('eq' => '1'))
                    ->addFieldToFilter('used', array('eq' => '0'));

                $mediaDirectory = $this->filesystem->getDirectoryRead(DirectoryList::MEDIA);
                $mediaRootDir = $mediaDirectory->getAbsolutePath('catalog/product');
                foreach ($modeldb as $image) {
                    if ($this->file->isExists($mediaRootDir . $image->getFilename())) {
                        $this->file->deleteFile($mediaRootDir . $image->getFilename());
                    }
                    $image->delete();
                    $counter++;
                    if ($counter > $maxImages){
                        break;
                    }
                }
            }

            if (in_array("unusedCategory", $resources)) {
                $modeldb = $this->imageCollectionFactory->create()
                    ->addFieldToFilter('isproduct', array('eq' => '0'));

                $mediaDirectory = $this->filesystem->getDirectoryRead(DirectoryList::MEDIA);
                $mediaRootDir = $mediaDirectory->getAbsolutePath('catalog/category');
                foreach ($modeldb as $image) {
                    if ($this->file->isExists($mediaRootDir . $image->getFilename())) {
                        $this->file->deleteFile($mediaRootDir . $image->getFilename());
                    }
                    $image->delete();
                    $counter++;
                    if ($counter > $maxImages){
                        break;
                    }
                }
            }
            if (in_array("dbRecordProduct", $resources)) {
                $this->dbRecordClear($counter);
            }
        } catch (\Exception $e) {
            $this->logger->info($e->getMessage());
            return false;
        }
        return true;
    }

    /**
     * @param $type
     * @return null|void
     */
    public function compareList($type)
    {
        try {
            $this->state->setAreaCode(Area::AREA_ADMINHTML);
            $imageCleanImages = $this->modelImagecleanFactory->create()->getCollection()->getImages();

            $rootPath = $this->directoryList->getRoot();
            $pathToDirectory = $rootPath . DIRECTORY_SEPARATOR . 'pub' . DIRECTORY_SEPARATOR . 'media' . DIRECTORY_SEPARATOR . 'catalog' . DIRECTORY_SEPARATOR . 'product';
            $allImagesInDirectory = $this->listDirectories($pathToDirectory);
            $model = $this->modelImagecleanFactory->create();
            $maxImages = $this->getMaxImages();
            $count = 0;

            if ($type == 'used'){
                $modeldb = $this->imageCollectionFactory->create()
                    ->addFieldToFilter('isproduct', array('eq' => '1'))
                    ->addFieldToFilter('used', array('eq' => '1'));

                $imgClean = [];
                foreach ($modeldb as $image) {
                    $imgClean[] = $image->getFilename();
                }

                if (sizeof($allImagesInDirectory) > 0 && sizeof($imageCleanImages) > 0) {
                    foreach ($allImagesInDirectory as $item) {
                        try {
                            $item = strtr($item, '\\', '/');
                            $size = round(filesize($pathToDirectory . $item) / 1024, 2);

                            if (array_key_exists($item, $imageCleanImages) && !in_array($item,$imgClean)) {
                                $valdir[]['filename'] = $item;
                                $model->setData(['filename' => $item])->setId(null);
                                $model->setIsproduct(1);
                                $model->setUsed($imageCleanImages[$item]['used']);
                                $model->setProductId($imageCleanImages[$item]['productId']);
                                $model->setProductName($imageCleanImages[$item]['product_name']);
                                $model->setPath($item);
                                $model->setSize($size);
                                $model->save();

                                $count++;
                            }
                            if ($count > $maxImages) {
                                break;
                            }
                        } catch (\Exception $e) {
                            $this->logger->info($e->getMessage());
                            return;
                        }
                    }
                }
                $this->checkDeletedProducts();

            }elseif ($type == 'unused'){
                $modeldb = $this->imageCollectionFactory->create()
                    ->addFieldToFilter('isproduct', array('eq' => '1'))
                    ->addFieldToFilter('used', array('eq' => '0'));

                $imgClean = [];
                foreach ($modeldb as $image) {
                    $imgClean[] = $image->getFilename();
                }

                if (sizeof($allImagesInDirectory) > 0 && sizeof($imageCleanImages) > 0) {
                    foreach ($allImagesInDirectory as $item) {
                        try {
                            $item = strtr($item, '\\', '/');
                            $size = round(filesize($pathToDirectory . $item) / 1024, 2);

                            if (!array_key_exists($item, $imageCleanImages) && !in_array($item,$imgClean)) {
                                $valdir[]['filename'] = $item;
                                $model->setData(['filename' => $item])->setId(null);
                                $model->setIsproduct(1);
                                $model->setPath($item);
                                $model->setSize($size);
                                $model->setUsed(0);
                                $model->save();

                                $count++;
                            } elseif (array_key_exists($item, $imageCleanImages) && !in_array($item,$imgClean)){
                                if ($imageCleanImages[$item]['productId'] == null){
                                    $valdir[]['filename'] = $item;
                                    $model->setData(['filename' => $item])->setId(null);
                                    $model->setIsproduct(1);
                                    $model->setPath($item);
                                    $model->setSize($size);
                                    $model->setUsed(0);
                                    $model->save();

                                    $count++;
                                }
                            }
                            if ($count > $maxImages) {
                                break;
                            }
                        } catch (\Exception $e) {
                            $this->logger->info($e->getMessage());
                            return;
                        }
                    }
                }
                $this->checkDeletedProducts();
            }
            return null;
        }catch (\Exception $e){
            $this->logger->info($e->getMessage());
            return;
        }
    }

    /**
     *
     */
    public function checkDeletedProducts()
    {
        try {
            $newColl = $this->imageCollectionFactory->create()
                ->addFieldToFilter('isproduct', array('eq' => '1'))
                ->addFieldToFilter('used', array('eq' => '1'))
                ->addFieldToFilter('product_id', ['null' => true]);

            if (sizeof($newColl->getData()) > 0 ) {
                foreach ($newColl->getData() as $itm) {
                    $deletedProduct = $this->modelImagecleanFactory->create()->load($itm['imageclean_id']);
                    $deletedProduct->setUsed(0);
                    $deletedProduct->save();
                }
            }
        }catch (\Exception $e){
            $this->logger->info($e->getMessage());
        }
        return;
    }

    /**
     * @return null
     */
    public function compareCategoryList()
    {
        $imageCleanImages = $this->getCategoryImages();
        $maxImages = $this->getMaxImages();
        $rootPath = $this->directoryList->getRoot();
        $pathToDirectory = $rootPath . DIRECTORY_SEPARATOR . 'pub' . DIRECTORY_SEPARATOR . 'media' . DIRECTORY_SEPARATOR . 'catalog' . DIRECTORY_SEPARATOR . 'category';
        $allImagesInDirectory = $this->listDirectoriesCategory($pathToDirectory);
        $model = $this->modelImagecleanFactory->create();
        $counter = 0;

        $modeldb = $this->imageCollectionFactory->create()
            ->addFieldToFilter('isproduct', array('eq' => '0'));

        $imgClean = [];
        foreach ($modeldb as $image) {
            $imgClean[] = $image->getFilename();
        }

        if (sizeof($allImagesInDirectory) > 0 && sizeof($imageCleanImages) > 0) {
            foreach ($allImagesInDirectory as $item) {
                if ($counter > $maxImages) {
                    break;
                }
                try {
                    $item = strtr($item, '\\', '/');
                    $size = round(filesize($pathToDirectory . $item) / 1024, 2);
                    if (!in_array($item, $imageCleanImages) && !in_array($item, $imgClean)) {
                        $valdir[]['filename'] = $item;
                        $model->setData(['filename' => $item])->setId(null);
                        $model->setIsproduct(0);
                        $model->setPath($item);
                        $model->setSize($size);
                        $model->save();

                        $counter++;
                    }
                } catch (\Exception $e) {
                    $this->logger->info($e->getMessage());
                }
            }
        }
        return null;
    }

    /**
     * @param $path
     * @return array
     */
    public function listDirectories($path)
    {
        $rootsPath = $this->directoryList->getRoot();
        $rootPathLen = strlen($rootsPath);

        if (is_dir($path)) {
            if ($dir = opendir($path)) {
                while (($entry = readdir($dir)) !== false) {
                    if (preg_match('/^\./', $entry) != 1) {
                        if (is_dir($path . DIRECTORY_SEPARATOR . $entry) && !in_array($entry, ['cache', 'watermark', 'placeholder'])) {
                            $this->listDirectories($path . DIRECTORY_SEPARATOR . $entry);
                        } elseif (!in_array($entry, ['cache', 'watermark', 'placeholder']) && (strpos($entry, '.') !== 0)) {
                            $this->result[] = substr($path . DIRECTORY_SEPARATOR . $entry, $rootPathLen + 26);
                        }
                    }
                }
                closedir($dir);
            }
        }
        return $this->result;
    }

    /**
     * @param $path
     * @return array
     */
    public function listDirectoriesCategory($path)
    {
        $rootsPath = $this->directoryList->getRoot();
        $rootPathLen = strlen($rootsPath);

        if (is_dir($path)) {
            if ($dir = opendir($path)) {
                while (($entry = readdir($dir)) !== false) {
                    if (preg_match('/^\./', $entry) != 1) {
                        if (is_dir($path . DIRECTORY_SEPARATOR . $entry) && !in_array($entry, ['cache', 'watermark', 'placeholder'])) {
                            $this->listDirectoriesCategory($path . DIRECTORY_SEPARATOR . $entry);
                        } elseif (!in_array($entry, ['cache', 'watermark','placeholder']) && (strpos($entry, '.') !== 0)) {
                            $this->result[] = substr($path . DIRECTORY_SEPARATOR . $entry, $rootPathLen + 27);
                        }
                    }
                }
                closedir($dir);
            }
        }
        return $this->result;
    }

    /**
     * @return array
     */
    public function getCategoryImages()
    {
        $images = [];
        try {
            $allImages = $this->modelImagecleanFactory->create()->getCollection();

            foreach ($allImages as $item) {
                $images[] = $item->getFilename();
            }
            $categorys = $this->getCategoryCollection();
            foreach ($categorys as $category) {
                if ($category->getImageUrl() != '') {
                    $mediaPath = $this->storeManager->getStore()->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA) . 'catalog/category';
                    $imgUrl = str_replace($mediaPath, "", $category->getImageUrl());
                    $imgUrl = str_replace('/pub/media/catalog/category/','/', $imgUrl);
                    $imgUrl = str_replace('/media/catalog/category/','/', $imgUrl);
                    $imgUrl = str_replace('//','/', $imgUrl);
                    $images[] = $imgUrl;
                }
            }
            return $images;
        } catch (\Exception $e) {
            $this->logger->info($e->getMessage());
        }
        return $images;
    }

    /**
     * @return string
     */
    public function getVersion()
    {
        return $this->productMetadata->getEdition();
    }

    /**
     * @return mixed
     */
    public function getCategoryCollection()
    {
        try {
            $collection = $this->categoryCollectionFactory->create();
            $collection->addAttributeToSelect('*');
            return $collection;
        }catch (\Exception $e){
            $this->logger->info($e->getMessage());
            return [];
        }
    }
}

