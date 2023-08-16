<?php

namespace Meetanshi\ImageClean\Observer;

use Magento\Framework\Event\ObserverInterface;
use Magento\Store\Model\StoreManagerInterface;
use Magento\Framework\Event\Observer;
use Meetanshi\ImageClean\Model\ResourceModel\Imageclean\CollectionFactory as ImagecleanFactory;
use Magento\Framework\App\ObjectManager;
use Magento\Framework\App\RequestInterface;

/**
 * Class ProductDelete
 * @package Meetanshi\ImageClean\Observer
 */
class ProductDelete implements ObserverInterface
{
    /**
     * @var StoreManagerInterface
     */
    protected $storeManager;
    /**
     * @var ImagecleanFactory
     */
    protected $modelImagecleanFactory;
    /**
     * @var RequestInterface
     */
    protected $request;

    /**
     * ProductDelete constructor.
     * @param StoreManagerInterface $storeManager
     * @param ImagecleanFactory $modelImagecleanFactory
     * @param RequestInterface $request
     */
    public function __construct(
        StoreManagerInterface $storeManager,
        ImagecleanFactory $modelImagecleanFactory,
        RequestInterface $request
    ) {
        $this->storeManager = $storeManager;
        $this->modelImagecleanFactory = $modelImagecleanFactory;
        $this->request = $request;
    }

    /**
     * @param Observer $observer
     */
    public function execute(Observer $observer)
    {
        $product = $observer->getEvent()->getProduct();
        $productId = $product->getId();

        try {
            if ($productId != null) {
                $model = $this->modelImagecleanFactory->create()->addFieldToFilter('product_id', $productId);
                foreach ($model as $item) {
                    $item->setData('used', 0);
                    $item->save();
                }
            }
        } catch (\Exception $e) {
            ObjectManager::getInstance()->get('Psr\Log\LoggerInterface')->info($e->getMessage());
        }
    }
}
