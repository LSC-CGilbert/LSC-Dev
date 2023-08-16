<?php

namespace Meetanshi\ImageClean\Controller\Adminhtml\Imageclean;

use Meetanshi\ImageClean\Model\Imageclean;
use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Ui\Component\MassAction\Filter;
use Meetanshi\ImageClean\Model\ResourceModel\Images\CollectionFactory;
use Magento\Framework\Filesystem\Driver\File;
use Magento\Framework\Filesystem;
use Magento\Framework\App\Filesystem\DirectoryList;
use Magento\Catalog\Model\Product\Gallery\Processor;
use Magento\Catalog\Model\ResourceModel\Product\Gallery;
use Magento\Catalog\Model\ProductFactory;

/**
 * Class MassDelete
 * @package Meetanshi\ImageClean\Controller\Adminhtml\Imageclean
 */
class MassDelete extends Action
{
    /**
     * @var
     */
    protected $messageManager;
    /**
     * @var Filter
     */
    protected $filter;
    /**
     * @var CollectionFactory
     */
    protected $collectionFactory;
    /**
     * @var Imageclean
     */
    protected $imageClean;
    /**
     * @var File
     */
    protected $file;
    /**
     * @var Filesystem
     */
    protected $fileSystem;
    /**
     * @var ProductFactory
     */
    protected $productFactory;
    /**
     * @var Processor
     */
    protected $imageProcessor;
    /**
     * @var Gallery
     */
    protected $productGallery;

    /**
     * MassDelete constructor.
     * @param Context $context
     * @param Filter $filter
     * @param CollectionFactory $collectionFactory
     * @param Imageclean $imageclean
     * @param File $file
     * @param Filesystem $filesystem
     * @param ProductFactory $productFactory
     * @param Processor $processor
     * @param Gallery $gallery
     */
    public function __construct(
        Context $context,
        Filter $filter,
        CollectionFactory $collectionFactory,
        Imageclean $imageclean,
        File $file,
        Filesystem $filesystem,
        ProductFactory $productFactory,
        Processor $processor,
        Gallery $gallery
    ) {
        $this->filter = $filter;
        $this->collectionFactory = $collectionFactory;
        $this->imageClean = $imageclean;
        $this->file = $file;
        $this->fileSystem = $filesystem;
        $this->productFactory = $productFactory;
        $this->imageProcessor = $processor;
        $this->productGallery = $gallery;
        parent::__construct($context);
    }

    /**
     * @return \Magento\Framework\App\ResponseInterface|\Magento\Framework\Controller\ResultInterface|void
     */
    public function execute()
    {
        try {
            $collection = $this->filter->getCollection($this->collectionFactory->create());
            $collectionSize = $collection->count();

            $mediaDirectory = $this->fileSystem->getDirectoryRead(DirectoryList::MEDIA);
            $mediaRootDir = $mediaDirectory->getAbsolutePath('catalog/product');

            foreach ($collection as $item) {
                $id = $item['imageclean_id'];
                $row = $this->imageClean->load($id);
                if ($this->file->isExists($mediaRootDir . $row->getFilename())) {
                    $this->file->deleteFile($mediaRootDir . $row->getFilename());
                }
                $row->delete();
            }
            $this->messageManager->addSuccess(__('A total of %1 record(s) have been deleted.', $collectionSize));
        } catch (\Exception $e) {
            $this->messageManager->addError($e->getMessage());
        }
        $this->_redirect('*/images/index');
    }

    /**
     * @return bool
     */
    protected function _isAllowed()
    {
        return $this->_authorization->isAllowed('Meetanshi_ImageClean::imageclean');
    }
}
