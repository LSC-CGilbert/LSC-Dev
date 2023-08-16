<?php
/**
 * BrandCrock Industryarc Plugin for Industryarc Theme in Magento2
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the GNU General Public License
 *
 * DISCLAIMER
 *
 * Do not add or edit the files if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category   BrandCrock
 * @package    BrandCrock_Industryarc
 * @copyright  Copyright (c) BrandCrock (https://www.brandcrock.com/)
 * @license    GNU General Public Licensel
 */
namespace BrandCrock\Industryarc\Block\Frontend;

class Block extends \Magento\Framework\View\Element\Template
{
    /**
     * @var \BrandCrock\Industryarc\Helper\Data
     */
    protected $helper;

    /**
     * Get the HTML Element
     *
     * @param \Magento\Framework\View\Element\Template\Context $context
     * @param \BrandCrock\Industryarc\Helper\Data $helper
     * @param array $data
     */
    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \BrandCrock\Industryarc\Helper\Data $helper,
        array $data = []
    ) {
        $this->helper = $helper;
        parent::__construct($context, $data);
    }

    /**
     * Get helper data
     *
     * @param  none
     * @return mixed
     */
    public function getHelperData()
    {
        return $this->helper;
    }
}
