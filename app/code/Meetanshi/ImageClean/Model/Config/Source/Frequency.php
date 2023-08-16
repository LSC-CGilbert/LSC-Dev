<?php

namespace Meetanshi\ImageClean\Model\Config\Source;

use Magento\Framework\Option\ArrayInterface;

/**
 * Class Frequency
 * @package Meetanshi\ImageClean\Model\Config\Source
 */
class Frequency implements ArrayInterface
{
    /**
     * @return array
     */
    public function toOptionArray()
    {
        return [
            ['value' => 'monthly', 'label' => "Monthly"],
            ['value' => 'weekly', 'label' => "Weekly"],
            ['value' => 'daily', 'label' => "Daily"],
        ];
    }
}
