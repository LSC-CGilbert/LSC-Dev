<?php

namespace Meetanshi\ImageClean\Controller\Adminhtml\Category;

use Meetanshi\ImageClean\Model\Imageclean;
use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Ui\Component\MassAction\Filter;
use Meetanshi\ImageClean\Model\ResourceModel\Category\CollectionFactory;
use Magento\Framework\Filesystem\Driver\File;
use Magento\Framework\Filesystem;
use Magento\Framework\App\Filesystem\DirectoryList;

/**
 * Class MassDelete
 * @package Meetanshi\ImageClean\Controller\Adminhtml\Category
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
     * MassDelete constructor.
     * @param Context $context
     * @param Filter $filter
     * @param CollectionFactory $collectionFactory
     * @param Imageclean $imageclean
     * @param File $file
     * @param Filesystem $filesystem
     */
    public function __construct(
        Context $context,
        Filter $filter,
        CollectionFactory $collectionFactory,
        Imageclean $imageclean,
        File $file,
        Filesystem $filesystem
    ) {
        $this->filter = $filter;
        $this->collectionFactory = $collectionFactory;
        $this->imageClean = $imageclean;
        $this->file = $file;
        $this->fileSystem = $filesystem;
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
            $mediaRootDir = $mediaDirectory->getAbsolutePath('catalog/category');

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
