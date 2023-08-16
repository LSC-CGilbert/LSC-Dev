<?php

namespace Meetanshi\ImageClean\Controller\Adminhtml\System;

use Magento\Framework\Controller\Result\JsonFactory;
use Meetanshi\ImageClean\Helper\Data;
use Magento\Backend\App\Action\Context;
use \Psr\Log\LoggerInterface;
use Magento\Backend\App\Action;

/**
 * Class Clearbutton
 * @package Meetanshi\ImageClean\Controller\Adminhtml\System
 */
class Clearbutton extends Action
{
    /**
     * @var LoggerInterface
     */
    protected $_logger;
    /**
     * @var JsonFactory
     */
    private $jsonFactory;
    /**
     * @var Data
     */
    private $helper;

    /**
     * Clearbutton constructor.
     * @param Context $context
     * @param LoggerInterface $logger
     * @param JsonFactory $jsonFactory
     * @param Data $data
     */
    public function __construct(
        Context $context,
        LoggerInterface $logger,
        JsonFactory $jsonFactory,
        Data $data
    ) {
        $this->_logger = $logger;
        $this->jsonFactory = $jsonFactory;
        $this->helper = $data;
        parent::__construct($context);
    }

    /**
     * @return \Magento\Framework\App\ResponseInterface|\Magento\Framework\Controller\Result\Json|\Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        $res = $this->helper->ConfigClear();

        $response = [
            'succeess' => "true",
            'successmesg' => ""
        ];
        $result = $this->jsonFactory->create();
        $result->setData($response);

        if ($res) {
            $this->messageManager->addSuccess(__('Image(s) was successfully deleted'));
        } else {
            $this->messageManager->addError(__('Unable to delete Image(s) try again'));
        }
        return $result;
    }

    /**
     * @return bool
     */
    protected function _isAllowed()
    {
        return $this->_authorization->isAllowed('Meetanshi_ImageClean::imageclean');
    }
}
