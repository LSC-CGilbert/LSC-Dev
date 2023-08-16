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
namespace BrandCrock\Industryarc\Setup\Patch\Data;

use Magento\Framework\Setup;
use Magento\Eav\Setup\EavSetup;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\InstallDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Framework\Exception\LocalizedException;

class IndustryarcAttribute implements DataPatchInterface, InstallDataInterface
{

    /**
     * @var EavSetupFactory
     */
    private $eavSetupFactory;

    /**
     * @var \Magento\Framework\Setup\ModuleDataSetupInterface
     */
    private $moduleDataSetup;

    /**
     * @var \Magento\Framework\App\Config\ConfigResource\ConfigInterface
     */
    private $resourceConfig;

    /**
     * @var Setup\SampleData\Executor
     */
    private $executor;

    /**
     * @var \BrandCrock\Industryarc\Setup\Installer
     */
    private $installer;

    /**
     * Init
     *
     * @param EavSetupFactory $eavSetupFactory
     * @param Setup\SampleData\Executor $executor
     * @param \BrandCrock\Industryarc\Block\Adminhtml\System\Installer $installer
     * @param \Magento\Framework\Setup\ModuleDataSetupInterface $moduleDataSetup
     * @param \Magento\Framework\App\Config\ConfigResource\ConfigInterface $resourceConfig
     */
    public function __construct(
        EavSetupFactory $eavSetupFactory,
        Setup\SampleData\Executor $executor,
        \BrandCrock\Industryarc\Setup\Installer $installer,
        \Magento\Framework\Setup\ModuleDataSetupInterface $moduleDataSetup,
        \Magento\Framework\App\Config\ConfigResource\ConfigInterface $resourceConfig
    ) {
        $this->eavSetupFactory = $eavSetupFactory;
        $this->executor = $executor;
        $this->installer = $installer;
        $this->moduleDataSetup = $moduleDataSetup;
        $this->resourceConfig = $resourceConfig;
    }

    /**
     * @inheritdoc
     */
    public function apply()
    {
        $this->moduleDataSetup->getConnection()->startSetup();
        $this->addIndustryarcAttribute();
        $this->moduleDataSetup->getConnection()->endSetup();
    }

    /**
     * @inheritdoc
     */
    public function addIndustryarcAttribute()
    {
        try {
            /** @var EavSetup $eavSetup */
            $eavSetup = $this->eavSetupFactory->create(['setup' => $this->moduleDataSetup]);
            
            $eavSetup->addAttribute(\Magento\Catalog\Model\Product::ENTITY, 'is_featured', [
                'group' => 'Product Details',
                'type' => 'int',
                'sort_order' => 102,
                'backend' => '',
                'frontend' => '',
                'label' => 'Is Featured?',
                'input' => 'boolean',
                'class' => '',
                'source' => \Magento\Eav\Model\Entity\Attribute\Source\Boolean::class,
                'global' => \Magento\Catalog\Model\ResourceModel\Eav\Attribute::SCOPE_GLOBAL,
                'visible' => true,
                'required' => false,
                'user_defined' => true,
                'default' => '',
                'searchable' => false,
                'filterable' => false,
                'comparable' => false,
                'visible_on_front' => false,
                'used_in_product_listing' => true,
                'unique' => false,
                'apply_to' => 'simple,configurable,virtual,bundle,downloadable'
                ]);
            $this->executor->exec($this->installer);
        } catch (\Exception $e) {
            throw new LocalizedException(__($e->getMessage()));
        }
    }

    /**
     * @inheritdoc
     */
    public function install(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        /** @var EavSetup $eavSetup */
        $eavSetup = $this->eavSetupFactory->create(['setup' => $setup]);
    }

    /**
     * @inheritdoc
     */
    public static function getDependencies()
    {
        return [];
    }

    /**
     * To revert
     */
    public function revert()
    {
        return [];
    }

    /**
     * @inheritdoc
     */
    public function getAliases()
    {
        return [];
    }
}
