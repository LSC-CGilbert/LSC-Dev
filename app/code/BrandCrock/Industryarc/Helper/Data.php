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
namespace BrandCrock\Industryarc\Helper;

use Magento\Framework\App\Helper\AbstractHelper;

class Data extends AbstractHelper
{
    /**
     * @var \Magento\Framework\App\Config\ScopeConfigInterface
     */
    protected $scopeConfig;
    
    /**
     * @var \Magento\Framework\Module\ModuleListInterface
     */
    protected $moduleList;

    /**
     * @var \Magento\Store\Model\StoreManagerInterface
     */
    protected $storeManager;

    /**
     * @var \Magento\Theme\Block\Html\Header\Logo
     */
    protected $logoblock;

    /**
     * Plugin Helper Data constructor
     *
     * @param ScopeConfigInterface $scopeConfig
     * @param ModuleListInterface $moduleList
     * @param \Magento\Store\Model\StoreManagerInterface $storeManager
     * @param \Magento\Theme\Block\Html\Header\Logo $logoblock
     */
    public function __construct(
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Framework\Module\ModuleListInterface $moduleList,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Theme\Block\Html\Header\Logo $logoblock
    ) {
        $this->scopeConfig = $scopeConfig;
        $this->moduleList = $moduleList;
        $this->storeManager = $storeManager;
        $this->logoblock = $logoblock;
    }

    /**
     * Plugin Helper Data getThemeConfig
     *
     * @param String $bciaData
     * @return config value
     */
    public function getThemeConfig($bciaData)
    {
        return $this->scopeConfig->getValue(
            'industryarc_theme/general/'.$bciaData,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE,
            $this->storeManager->getStore()->getStoreId()
        );
    }

    /**
     * Plugin Helper Data getHeaderColorConfig
     *
     * @param String $bciaData
     * @return config value
     */
    public function getHeaderColorConfig($bciaData)
    {
        return $this->scopeConfig->getValue(
            'industryarc_theme/bcia_header_color_config/'.$bciaData,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE,
            $this->storeManager->getStore()->getStoreId()
        );
    }

    /**
     * Plugin Helper Data getFooterColorConfig
     *
     * @param String $bciaData
     * @return config value
     */
    public function getFooterColorConfig($bciaData)
    {
        return $this->scopeConfig->getValue(
            'industryarc_theme/bcia_footer_color_config/'.$bciaData,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE,
            $this->storeManager->getStore()->getStoreId()
        );
    }

    /**
     * Plugin Helper Data getProductColorConfig
     *
     * @param String $bciaData
     * @return config value
     */
    public function getProductColorConfig($bciaData)
    {
        return $this->scopeConfig->getValue(
            'industryarc_theme/bcia_product_color_config/'.$bciaData,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE,
            $this->storeManager->getStore()->getStoreId()
        );
    }

    /**
     * Plugin Helper Data getSocialConfig
     *
     * @param String $bciaData
     * @return config value
     */
    public function getSocialConfig($bciaData)
    {
        return $this->scopeConfig->getValue(
            'industryarc_theme/bcia_social_links/'.$bciaData,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE,
            $this->storeManager->getStore()->getStoreId()
        );
    }

    /**
     * Plugin Helper Data getFooterConfig
     *
     * @param String $bciaData
     * @return config value
     */
    public function getFooterConfig($bciaData)
    {
        return $this->scopeConfig->getValue(
            'industryarc_theme/bcia_footer_config/'.$bciaData,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE,
            $this->storeManager->getStore()->getStoreId()
        );
    }

    /**
     * Plugin preloader Data getThemeConfig
     *
     * @param String $bciaData
     * @return config value
     */
    public function getPreloaderConfig($bciaData)
    {
        return $this->scopeConfig->getValue(
            'industryarc_theme/bcia_preloader/'.$bciaData,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE,
            $this->storeManager->getStore()->getStoreId()
        );
    }

    /**
     * Plugin getBottomAdConfig
     *
     * @param String $bciaData
     * @return config value
     */
    public function getAdConfig($bciaData)
    {
        return $this->scopeConfig->getValue(
            'industryarc_theme/bcia_bottom_ad/'.$bciaData,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE,
            $this->storeManager->getStore()->getStoreId()
        );
    }

    /**
     * Get Baseurl
     *
     * @param none
     * @return mixed
     */
    public function getBaseUrl()
    {
        return $this->storeManager->getStore()->getBaseUrl();
    }

    /**
     * Get Ishomepage
     *
     * @param none
     * @return mixed
     */
    public function getIsHomePage()
    {
        return $this->logoblock->isHomePage();
    }

    /**
     * Get ProductBgImage
     *
     * @param none
     * @return mixed
     */
    public function getProductBgImage()
    {
        $logoSrc = "";
        $currentStore = $this->storeManager->getStore();
        $mediaUrl = $currentStore->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA);
        if (!empty($this->getProductColorConfig('bcia_product_bg_image'))) {
            $logoSrc = $mediaUrl.'brandcrock/industryarc/'.$this->getProductColorConfig('bcia_product_bg_image');
        }
        return $logoSrc;
    }

    /**
     * Get FooterImage
     *
     * @param string $bciaData
     * @return mixed
     */
    public function getFooterImage($bciaData)
    {
        $logoSrc = "";
        $currentStore = $this->storeManager->getStore();
        $mediaUrl = $currentStore->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA);
        if (!empty($this->getFooterConfig($bciaData))) {
            $logoSrc = $mediaUrl.'brandcrock/industryarc/'.$this->getFooterConfig($bciaData);
        }
        return $logoSrc;
    }

    /**
     * Get BottomAdImage
     *
     * @param none
     * @return mixed
     */
    public function getAdImage()
    {
        $logoSrc = "";
        $currentStore = $this->storeManager->getStore();
        $mediaUrl = $currentStore->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA);
        if (!empty($this->getAdConfig('bcia_bottom_ad_image'))) {
            $logoSrc = $mediaUrl.'brandcrock/industryarc/'.$this->getAdConfig('bcia_bottom_ad_image');
        }
        return $logoSrc;
    }

    /**
     * Get preloader image
     *
     * @param none
     * @return mixed
     */
    public function getPreloaderImage()
    {
        $logoSrc = "";
        $currentStore = $this->storeManager->getStore();
        $mediaUrl = $currentStore->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA);
        if (!empty($this->getPreloaderConfig('bcia_preloader_image'))) {
            $logoSrc = $mediaUrl.'brandcrock/industryarc/'.$this->getPreloaderConfig('bcia_preloader_image');
        }
        return $logoSrc;
    }
}
