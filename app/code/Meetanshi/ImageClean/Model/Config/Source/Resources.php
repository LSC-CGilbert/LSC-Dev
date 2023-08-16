<?php

namespace Meetanshi\ImageClean\Model\Config\Source;

use Magento\Framework\Option\ArrayInterface;

/**
 * Class Resources
 * @package Meetanshi\ImageClean\Model\Config\Source
 */
class Resources implements ArrayInterface
{
    /**
     * @return array
     */
    public function toOptionArray()
    {
        return [
            ['value' => 'unusedCategory', 'label' => 'Unused Category Images'],
            ['value' => 'unusedProduct', 'label' => 'Unused Product Images'],
            ['value' => 'dbRecordProduct', 'label' => "DB Record for Non Existing Product Images"],
        ];
    }
}
