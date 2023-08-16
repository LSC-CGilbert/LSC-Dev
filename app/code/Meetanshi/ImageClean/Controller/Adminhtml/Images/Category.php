<?php

namespace Meetanshi\ImageClean\Controller\Adminhtml\Images;

use Magento\Backend\App\Action\Context;
use Magento\Framework\View\Result\PageFactory;
use Meetanshi\ImageClean\Helper\Data;
use Magento\Backend\App\Action;

/**
 * Class Category
 * @package Meetanshi\ImageClean\Controller\Adminhtml\Images
 */
class Category extends Action
{
    /**
     * @var PageFactory
     */
    protected $resultPageFactory;
    /**
     * @var Data
     */
    protected $helper;

    /**
     * Category constructor.
     * @param Context $context
     * @param PageFactory $resultPageFactory
     * @param Data $data
     */
    public function __construct(
        Context $context,
        PageFactory $resultPageFactory,
        Data $data
    ) {
        parent::__construct($context);
        $this->resultPageFactory = $resultPageFactory;
        $this->helper = $data;
    }

    /**
     * @return \Magento\Framework\App\ResponseInterface|\Magento\Framework\Controller\ResultInterface|\Magento\Framework\View\Result\Page
     */
    public function execute()
    {
        $resultPage = $this->resultPageFactory->create();
        $resultPage->setActiveMenu('Meetanshi_ImageClean::imageclean');
        $resultPage->getConfig()->getTitle()->prepend((__('Unused Category Images')));
        return $resultPage;
    }

    /**
     * @return bool
     */
    protected function _isAllowed()
    {
        return $this->_authorization->isAllowed('Meetanshi_ImageClean::imageclean');
    }
}
