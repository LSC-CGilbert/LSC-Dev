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
 * @license    GNU General Public License
 */
namespace BrandCrock\Industryarc\Setup;

use Magento\Framework\Setup;

class Installer implements Setup\SampleData\InstallerInterface
{

    /**
     * @var \Magento\CmsSampleData\Model\Block
     */
    private $block;

    /**
     * @param \BrandCrock\Industryarc\Model\Block $block
     */
    public function __construct(
        \BrandCrock\Industryarc\Model\Block $block
    ) {
        $this->block = $block;
    }

    /**
     * @inheritdoc
     */
    public function install()
    {
        $this->block->install(
            [
                'BrandCrock_Industryarc::cmsblocks/cms_static_blocks.csv',
            ]
        );
    }
}
