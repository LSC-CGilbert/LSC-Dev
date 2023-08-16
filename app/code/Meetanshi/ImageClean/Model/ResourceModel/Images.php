<?php

namespace Meetanshi\ImageClean\Model\ResourceModel;

use Magento\Framework\Model\ResourceModel\Db\AbstractDb;

/**
 * Class Images
 * @package Meetanshi\ImageClean\Model\ResourceModel
 */
class Images extends AbstractDb
{
    protected function _construct()
    {
        $this->_init('meetanshi_imageclean', 'imageclean_id');
    }
}
