<?php

namespace Meetanshi\ImageClean\Model\ResourceModel\Category;

use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;
use Magento\Framework\Data\Collection\EntityFactoryInterface;
use Psr\Log\LoggerInterface;
use Magento\Framework\Data\Collection\Db\FetchStrategyInterface;
use Magento\Framework\Event\ManagerInterface;
use Magento\Store\Model\StoreManagerInterface;

/**
 * Class Collection
 * @package Meetanshi\ImageClean\Model\ResourceModel\Category
 */
class Collection extends AbstractCollection
{
    /**
     * @var string
     */
    protected $_idFieldName = 'imageclean_id';
    /**
     * @var StoreManagerInterface
     */
    protected $storeManager;

    /**
     * Collection constructor.
     * @param EntityFactoryInterface $entityFactory
     * @param LoggerInterface $logger
     * @param FetchStrategyInterface $fetchStrategy
     * @param ManagerInterface $eventManager
     * @param StoreManagerInterface $storeManager
     */
    public function __construct(
        EntityFactoryInterface $entityFactory,
        LoggerInterface $logger,
        FetchStrategyInterface $fetchStrategy,
        ManagerInterface $eventManager,
        StoreManagerInterface $storeManager
    ) {
        $this->_init(\Meetanshi\ImageClean\Model\Images::class, \Meetanshi\ImageClean\Model\ResourceModel\Images::class);
        $this->storeManager = $storeManager;
        parent::__construct($entityFactory, $logger, $fetchStrategy, $eventManager);
    }

    /**
     *
     */
    protected function _construct()
    {
        parent::_construct();
    }

    /**
     * @return $this|void
     */
    protected function _initSelect()
    {
        parent::_initSelect();
        $this->getSelect()->where('main_table.isproduct = "0"');
    }
}

