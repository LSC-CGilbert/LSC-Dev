<?php

namespace Meetanshi\ImageClean\Model;

use Magento\Framework\DataObject;

/**
 * Class Status
 * @package Meetanshi\ImageClean\Model
 */
class Status extends DataObject
{
    const STATUS_ENABLED = 1;
    const STATUS_DISABLED = 2;

    /**
     * @return array
     */
    public static function getOptionArray()
    {
        return [
            self::STATUS_ENABLED => __('Enabled'),
            self::STATUS_DISABLED => __('Disabled')
        ];
    }
}
