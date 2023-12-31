<?php

namespace Meetanshi\ImageClean\Ui\Component\Listing\Category\Column;

use Magento\Framework\View\Element\UiComponent\ContextInterface;
use Magento\Framework\View\Element\UiComponentFactory;
use Magento\Ui\Component\Listing\Columns\Column;
use Magento\Customer\Model\Customer as Custom;
use Magento\Framework\Escaper;
use Magento\Store\Model\StoreManagerInterface;

class Image extends Column
{
    /**
     * @var
     */
    protected $systemStore;
    /**
     * @var StoreManagerInterface
     */
    protected $storeManager;
    /**
     * @var
     */
    protected $helper;
    /**
     * @var Custom
     */
    protected $customer;
    /**
     * @var Escaper
     */
    protected $escaper;

    /**
     * @param ContextInterface $context
     * @param UiComponentFactory $uiComponentFactory
     * @param Custom $customer
     * @param Escaper $escaper
     * @param StoreManagerInterface $storeManager
     * @param array $components
     * @param array $data
     */
    public function __construct(
        ContextInterface $context,
        UiComponentFactory $uiComponentFactory,
        Custom $customer,
        Escaper $escaper,
        StoreManagerInterface $storeManager,
        array $components = [],
        array $data = []
    ) {
        $this->customer = $customer;
        $this->escaper = $escaper;
        $this->storeManager = $storeManager;
        parent::__construct($context, $uiComponentFactory, $components, $data);
    }

    /**
     * @param array $dataSource
     * @return array
     * @throws \Magento\Framework\Exception\NoSuchEntityException
     */
    public function prepareDataSource(array $dataSource)
    {
        $path = $this->storeManager->getStore()->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA) . 'catalog/category';

        if (isset($dataSource['data']['items'])) {
            foreach ($dataSource['data']['items'] as & $item) {
                if ($item['filename'] != '' || $item['filename'] != null):
                    $status = '<div style="width: 70px; height: 70px"><a id="a-popup" href="#"><img src="' . $path . $item['filename'] . '" width="auto" alt="product-img"/></a></div>';

                    $item['filename_img'] = $path . $item['filename'];

                    $item['filename'] = $status;
                endif;
            }
        }
        return $dataSource;
    }

    /**
     * @param $row
     * @return string
     */
    protected function getAlt($row)
    {
        return 'category-image';
    }
}
