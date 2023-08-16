<?php

namespace Meetanshi\ImageClean\Controller\Adminhtml\Useimages;

use Meetanshi\ImageClean\Model\ImagecleanFactory;
use Magento\Backend\App\Action\Context;
use Magento\Framework\Filesystem\Driver\File;
use Magento\Framework\Filesystem;
use Magento\Framework\App\Filesystem\DirectoryList;
use Magento\Catalog\Model\ProductFactory;
use Magento\Catalog\Api\ProductRepositoryInterface;

/**
 * Class Delete
 * @package Meetanshi\ImageClean\Controller\Adminhtml\Useimages
 */
class Delete extends \Magento\Backend\App\Action
{
    /**
     * @var ImagecleanFactory
     */
    protected $modelImagecleanFactory;
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
     * @var ProductRepositoryInterface
     */
    protected $productRepository;

    /**
     * Delete constructor.
     * @param Context $context
     * @param ImagecleanFactory $modelImagecleanFactory
     * @param File $file
     * @param Filesystem $filesystem
     * @param ProductFactory $productFactory
     * @param ProductRepositoryInterface $productRepository
     */
    public function __construct(
        Context $context,
        ImagecleanFactory $modelImagecleanFactory,
        File $file,
        Filesystem $filesystem,
        ProductFactory $productFactory,
        ProductRepositoryInterface $productRepository
    ) {

        $this->modelImagecleanFactory = $modelImagecleanFactory;
        $this->file = $file;
        $this->fileSystem = $filesystem;
        $this->productRepository = $productRepository;
        $this->productFactory = $productFactory;
        parent::__construct($context);
    }

    /**
     * @return \Magento\Framework\App\ResponseInterface|\Magento\Framework\Controller\ResultInterface|void
     */
    public function execute()
    {
        if ($this->getRequest()->getParam('imageclean_id') > 0) {
            try {
                $model = $this->modelImagecleanFactory->create();
                $model->load($this->getRequest()->getParam('imageclean_id'));

                if ($model->getProductId() > 0) {
                    $product = $this->productFactory->create();
                    $existingMediaGalleryEntries = $product->load($model->getProductId())->getMediaGalleryEntries();
                    if (!is_null($existingMediaGalleryEntries) && sizeof($existingMediaGalleryEntries) > 0) {
                        foreach ($existingMediaGalleryEntries as $key => $entry) {
                            $fileName = $model->getFilename();
                            if ($entry->getData('file') == $fileName) {
                                unset($existingMediaGalleryEntries[$key]);

                                $product->setMediaGalleryEntries($existingMediaGalleryEntries);
                                $this->productRepository->save($product);
                            }
                        }
                    }
                }
                $mediaDirectory = $this->fileSystem->getDirectoryRead(DirectoryList::MEDIA);
                $mediaRootDir = $mediaDirectory->getAbsolutePath('catalog/product');
                if ($this->file->isExists($mediaRootDir . $model->getFilename())) {
                    $this->file->deleteFile($mediaRootDir . $model->getFilename());
                }
                $model->setId($this->getRequest()->getParam('imageclean_id'))->delete();
                $this->messageManager->addSuccess(__('Image was successfully deleted'));
                $this->_redirect('*/useimages/index');
            } catch (\Exception $e) {
                $this->messageManager->addError($e->getMessage());
                $this->_redirect('*/useimages/index');
            }
        }
        $this->_redirect('*/useimages/index');
    }

    /**
     * @return bool
     */
    protected function _isAllowed()
    {
        return $this->_authorization->isAllowed('Meetanshi_ImageClean::imageclean');
    }
}
