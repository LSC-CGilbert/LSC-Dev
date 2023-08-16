<?php

namespace Meetanshi\ImageClean\Model;

use Magento\Framework\Model\AbstractModel;

/**
 * Class Imageclean
 * @package Meetanshi\ImageClean\Model
 */
class Imageclean extends AbstractModel
{
    protected function _construct()
    {
        $this->_init(ResourceModel\Imageclean::class);
    }
}
