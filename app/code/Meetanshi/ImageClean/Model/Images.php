<?php

namespace Meetanshi\ImageClean\Model;

use Magento\Framework\Model\AbstractModel;

/**
 * Class Images
 * @package Meetanshi\ImageClean\Model
 */
class Images extends AbstractModel
{
    protected function _construct()
    {
        $this->_init(ResourceModel\Images::class);
    }
}
