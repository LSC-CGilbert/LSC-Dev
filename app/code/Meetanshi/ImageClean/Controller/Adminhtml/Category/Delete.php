<?php

namespace Meetanshi\ImageClean\Controller\Adminhtml\Category;

use Meetanshi\ImageClean\Model\ImagecleanFactory;
use Magento\Backend\App\Action\Context;
use Magento\Framework\Filesystem\Driver\File;
use Magento\Framework\Filesystem;
use Magento\Framework\App\Filesystem\DirectoryList;

/**
 * Class Delete
 * @package Meetanshi\ImageClean\Controller\Adminhtml\Category
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
     * Delete constructor.
     * @param Context $context
     * @param ImagecleanFactory $modelImagecleanFactory
     * @param File $file
     * @param Filesystem $filesystem
     */
    public function __construct(
        Context $context,
        ImagecleanFactory $modelImagecleanFactory,
        File $file,
        Filesystem $filesystem
    ) {

        $this->modelImagecleanFactory = $modelImagecleanFactory;
        $this->file = $file;
        $this->fileSystem = $filesystem;
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

                $mediaDirectory = $this->fileSystem->getDirectoryRead(DirectoryList::MEDIA);
                $mediaRootDir = $mediaDirectory->getAbsolutePath('catalog/category');

                if ($this->file->isExists($mediaRootDir . $model->getFilename())) {
                    $this->file->deleteFile($mediaRootDir . $model->getFilename());
                }
                $model->setId($this->getRequest()->getParam('imageclean_id'))->delete();

                $this->messageManager->addSuccess(__('Image was successfully deleted'));
                $this->_redirect('*/*/');
            } catch (\Exception $e) {
                $this->messageManager->addError($e->getMessage());
                $this->_redirect('*/*/edit', ['id' => $this->getRequest()->getParam('id')]);
            }
        }
        $this->_redirect('*/images/category');
    }

    /**
     * @return bool
     */
    protected function _isAllowed()
    {
        return $this->_authorization->isAllowed('Meetanshi_ImageClean::imageclean');
    }
}
