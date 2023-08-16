<?php

namespace Meetanshi\ImageClean\Controller\Adminhtml\Useimages;

use Magento\Backend\App\Action\Context;
use Magento\Framework\View\Result\PageFactory;
use Meetanshi\ImageClean\Helper\Data;
use Magento\Backend\App\Action;

/**
 * Class Index
 * @package Meetanshi\ImageClean\Controller\Adminhtml\Useimages
 */
class Index extends Action
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
     * Index constructor.
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
        $resultPage->getConfig()->getTitle()->prepend((__('Used Product Images')));
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
