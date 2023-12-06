(function(require){
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            directoryRegionUpdater: 'Magento_Directory/js/region-updater'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    waitSeconds: 0,
    map: {
        '*': {
            'ko': 'knockoutjs/knockout',
            'knockout': 'knockoutjs/knockout',
            'mageUtils': 'mage/utils/main',
            'rjsResolver': 'mage/requirejs/resolver',
            'jquery-ui-modules/core': 'jquery/ui-modules/core',
            'jquery-ui-modules/accordion': 'jquery/ui-modules/widgets/accordion',
            'jquery-ui-modules/autocomplete': 'jquery/ui-modules/widgets/autocomplete',
            'jquery-ui-modules/button': 'jquery/ui-modules/widgets/button',
            'jquery-ui-modules/datepicker': 'jquery/ui-modules/widgets/datepicker',
            'jquery-ui-modules/dialog': 'jquery/ui-modules/widgets/dialog',
            'jquery-ui-modules/draggable': 'jquery/ui-modules/widgets/draggable',
            'jquery-ui-modules/droppable': 'jquery/ui-modules/widgets/droppable',
            'jquery-ui-modules/effect-blind': 'jquery/ui-modules/effects/effect-blind',
            'jquery-ui-modules/effect-bounce': 'jquery/ui-modules/effects/effect-bounce',
            'jquery-ui-modules/effect-clip': 'jquery/ui-modules/effects/effect-clip',
            'jquery-ui-modules/effect-drop': 'jquery/ui-modules/effects/effect-drop',
            'jquery-ui-modules/effect-explode': 'jquery/ui-modules/effects/effect-explode',
            'jquery-ui-modules/effect-fade': 'jquery/ui-modules/effects/effect-fade',
            'jquery-ui-modules/effect-fold': 'jquery/ui-modules/effects/effect-fold',
            'jquery-ui-modules/effect-highlight': 'jquery/ui-modules/effects/effect-highlight',
            'jquery-ui-modules/effect-scale': 'jquery/ui-modules/effects/effect-scale',
            'jquery-ui-modules/effect-pulsate': 'jquery/ui-modules/effects/effect-pulsate',
            'jquery-ui-modules/effect-shake': 'jquery/ui-modules/effects/effect-shake',
            'jquery-ui-modules/effect-slide': 'jquery/ui-modules/effects/effect-slide',
            'jquery-ui-modules/effect-transfer': 'jquery/ui-modules/effects/effect-transfer',
            'jquery-ui-modules/effect': 'jquery/ui-modules/effect',
            'jquery-ui-modules/menu': 'jquery/ui-modules/widgets/menu',
            'jquery-ui-modules/mouse': 'jquery/ui-modules/widgets/mouse',
            'jquery-ui-modules/position': 'jquery/ui-modules/position',
            'jquery-ui-modules/progressbar': 'jquery/ui-modules/widgets/progressbar',
            'jquery-ui-modules/resizable': 'jquery/ui-modules/widgets/resizable',
            'jquery-ui-modules/selectable': 'jquery/ui-modules/widgets/selectable',
            'jquery-ui-modules/selectmenu': 'jquery/ui-modules/widgets/selectmenu',
            'jquery-ui-modules/slider': 'jquery/ui-modules/widgets/slider',
            'jquery-ui-modules/sortable': 'jquery/ui-modules/widgets/sortable',
            'jquery-ui-modules/spinner': 'jquery/ui-modules/widgets/spinner',
            'jquery-ui-modules/tabs': 'jquery/ui-modules/widgets/tabs',
            'jquery-ui-modules/tooltip': 'jquery/ui-modules/widgets/tooltip',
            'jquery-ui-modules/widget': 'jquery/ui-modules/widget',
            'jquery-ui-modules/timepicker': 'jquery/timepicker',
            'vimeo': 'vimeo/player',
            'vimeoWrapper': 'vimeo/vimeo-wrapper'
        }
    },
    shim: {
        'mage/adminhtml/backup': ['prototype'],
        'mage/captcha': ['prototype'],
        'mage/new-gallery': ['jquery'],
        'jquery/ui': ['jquery'],
        'matchMedia': {
            'exports': 'mediaCheck'
        },
        'magnifier/magnifier': ['jquery'],
        'vimeo/player': {
            'exports': 'Player'
        }
    },
    paths: {
        'jquery/validate': 'jquery/jquery.validate',
        'jquery/file-uploader': 'jquery/fileUploader/jquery.fileuploader',
        'prototype': 'legacy-build.min',
        'jquery/jquery-storageapi': 'js-storage/storage-wrapper',
        'text': 'mage/requirejs/text',
        'domReady': 'requirejs/domReady',
        'spectrum': 'jquery/spectrum/spectrum',
        'tinycolor': 'jquery/spectrum/tinycolor',
        'jquery-ui-modules': 'jquery/ui-modules'
    },
    config: {
        text: {
            'headers': {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
    }
};

require(['jquery'], function ($) {
    'use strict';

    $.noConflict();
});

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            'rowBuilder':             'Magento_Theme/js/row-builder',
            'toggleAdvanced':         'mage/toggle',
            'translateInline':        'mage/translate-inline',
            'sticky':                 'mage/sticky',
            'tabs':                   'mage/tabs',
            'collapsible':            'mage/collapsible',
            'dropdownDialog':         'mage/dropdown',
            'dropdown':               'mage/dropdowns',
            'accordion':              'mage/accordion',
            'loader':                 'mage/loader',
            'tooltip':                'mage/tooltip',
            'deletableItem':          'mage/deletable-item',
            'itemTable':              'mage/item-table',
            'fieldsetControls':       'mage/fieldset-controls',
            'fieldsetResetControl':   'mage/fieldset-controls',
            'redirectUrl':            'mage/redirect-url',
            'loaderAjax':             'mage/loader',
            'menu':                   'mage/menu',
            'popupWindow':            'mage/popup-window',
            'validation':             'mage/validation/validation',
            'breadcrumbs':            'Magento_Theme/js/view/breadcrumbs',
            'jquery/ui':              'jquery/compat',
            'cookieStatus':           'Magento_Theme/js/cookie-status'
        }
    },
    deps: [
        'mage/common',
        'mage/dataPost',
        'mage/bootstrap'
    ],
    config: {
        mixins: {
            'Magento_Theme/js/view/breadcrumbs': {
                'Magento_Theme/js/view/add-home-breadcrumb': true
            }
        }
    }
};

/* eslint-disable max-depth */
/**
 * Adds polyfills only for browser contexts which prevents bundlers from including them.
 */
if (typeof window !== 'undefined' && window.document) {
    /**
     * Polyfill localStorage and sessionStorage for browsers that do not support them.
     */
    try {
        if (!window.localStorage || !window.sessionStorage) {
            throw new Error();
        }

        localStorage.setItem('storage_test', 1);
        localStorage.removeItem('storage_test');
    } catch (e) {
        config.deps.push('mage/polyfill');
    }
}
/* eslint-enable max-depth */

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            checkoutBalance:    'Magento_Customer/js/checkout-balance',
            address:            'Magento_Customer/js/address',
            changeEmailPassword: 'Magento_Customer/js/change-email-password',
            passwordStrengthIndicator: 'Magento_Customer/js/password-strength-indicator',
            zxcvbn: 'Magento_Customer/js/zxcvbn',
            addressValidation: 'Magento_Customer/js/addressValidation',
            showPassword: 'Magento_Customer/js/show-password',
            'Magento_Customer/address': 'Magento_Customer/js/address',
            'Magento_Customer/change-email-password': 'Magento_Customer/js/change-email-password',
            globalSessionLoader:    'Magento_Customer/js/customer-global-session-loader.js'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            escaper: 'Magento_Security/js/escaper'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            quickSearch: 'Magento_Search/js/form-mini',
            'Magento_Search/form-mini': 'Magento_Search/js/form-mini'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            priceBox:             'Magento_Catalog/js/price-box',
            priceOptionDate:      'Magento_Catalog/js/price-option-date',
            priceOptionFile:      'Magento_Catalog/js/price-option-file',
            priceOptions:         'Magento_Catalog/js/price-options',
            priceUtils:           'Magento_Catalog/js/price-utils'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            compareList:            'Magento_Catalog/js/list',
            relatedProducts:        'Magento_Catalog/js/related-products',
            upsellProducts:         'Magento_Catalog/js/upsell-products',
            productListToolbarForm: 'Magento_Catalog/js/product/list/toolbar',
            catalogGallery:         'Magento_Catalog/js/gallery',
            catalogAddToCart:       'Magento_Catalog/js/catalog-add-to-cart'
        }
    },
    config: {
        mixins: {
            'Magento_Theme/js/view/breadcrumbs': {
                'Magento_Catalog/js/product/breadcrumbs': true
            }
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            addToCart: 'Magento_Msrp/js/msrp'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            catalogSearch: 'Magento_CatalogSearch/form-mini'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            creditCardType: 'Magento_Payment/js/cc-type',
            'Magento_Payment/cc-type': 'Magento_Payment/js/cc-type'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            giftMessage:    'Magento_Sales/js/gift-message',
            ordersReturns:  'Magento_Sales/js/orders-returns',
            'Magento_Sales/gift-message':    'Magento_Sales/js/gift-message',
            'Magento_Sales/orders-returns':  'Magento_Sales/js/orders-returns'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            discountCode:           'Magento_Checkout/js/discount-codes',
            shoppingCart:           'Magento_Checkout/js/shopping-cart',
            regionUpdater:          'Magento_Checkout/js/region-updater',
            sidebar:                'Magento_Checkout/js/sidebar',
            checkoutLoader:         'Magento_Checkout/js/checkout-loader',
            checkoutData:           'Magento_Checkout/js/checkout-data',
            proceedToCheckout:      'Magento_Checkout/js/proceed-to-checkout',
            catalogAddToCart:       'Magento_Catalog/js/catalog-add-to-cart'
        }
    },
    shim: {
        'Magento_Checkout/js/model/totals' : {
            deps: ['Magento_Customer/js/customer-data']
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            requireCookie: 'Magento_Cookie/js/require-cookie',
            cookieNotices: 'Magento_Cookie/js/notices'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            downloadable: 'Magento_Downloadable/js/downloadable',
            'Magento_Downloadable/downloadable': 'Magento_Downloadable/js/downloadable'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            bundleOption:   'Magento_Bundle/bundle',
            priceBundle:    'Magento_Bundle/js/price-bundle',
            slide:          'Magento_Bundle/js/slide',
            productSummary: 'Magento_Bundle/js/product-summary'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            giftOptions:    'Magento_GiftMessage/js/gift-options',
            'Magento_GiftMessage/gift-options':    'Magento_GiftMessage/js/gift-options'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    deps: [],
    shim: {
        'chartjs/chartjs-adapter-moment': ['moment'],
        'chartjs/es6-shim.min': {},
        'tiny_mce_5/tinymce.min': {
            exports: 'tinyMCE'
        }
    },
    paths: {
        'ui/template': 'Magento_Ui/templates'
    },
    map: {
        '*': {
            uiElement:      'Magento_Ui/js/lib/core/element/element',
            uiCollection:   'Magento_Ui/js/lib/core/collection',
            uiComponent:    'Magento_Ui/js/lib/core/collection',
            uiClass:        'Magento_Ui/js/lib/core/class',
            uiEvents:       'Magento_Ui/js/lib/core/events',
            uiRegistry:     'Magento_Ui/js/lib/registry/registry',
            consoleLogger:  'Magento_Ui/js/lib/logger/console-logger',
            uiLayout:       'Magento_Ui/js/core/renderer/layout',
            buttonAdapter:  'Magento_Ui/js/form/button-adapter',
            chartJs:        'chartjs/Chart.min',
            'chart.js':     'chartjs/Chart.min',
            tinymce:        'tiny_mce_5/tinymce.min',
            wysiwygAdapter: 'mage/adminhtml/wysiwyg/tiny_mce/tinymce5Adapter'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    deps: [
        'Magento_Ui/js/core/app'
    ]
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            pageCache:  'Magento_PageCache/js/page-cache'
        }
    },
    deps: ['Magento_PageCache/js/form-key-provider']
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            captcha: 'Magento_Captcha/js/captcha',
            'Magento_Captcha/captcha': 'Magento_Captcha/js/captcha'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            configurable: 'Magento_ConfigurableProduct/js/configurable'
        }
    },
    config: {
        mixins: {
            'Magento_Catalog/js/catalog-add-to-cart': {
                'Magento_ConfigurableProduct/js/catalog-add-to-cart-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            multiShipping: 'Magento_Multishipping/js/multi-shipping',
            orderOverview: 'Magento_Multishipping/js/overview',
            payment: 'Magento_Multishipping/js/payment',
            billingLoader: 'Magento_Checkout/js/checkout-loader',
            cartUpdate: 'Magento_Checkout/js/action/update-shopping-cart',
            multiShippingBalance: 'Magento_Multishipping/js/multi-shipping-balance'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            recentlyViewedProducts: 'Magento_Reports/js/recently-viewed'
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/model/quote': {
                'Magento_InventoryInStorePickupFrontend/js/model/quote-ext': true
            },
            'Magento_Checkout/js/view/shipping-information': {
                'Magento_InventoryInStorePickupFrontend/js/view/shipping-information-ext': true
            },
            'Magento_Checkout/js/model/checkout-data-resolver': {
                'Magento_InventoryInStorePickupFrontend/js/model/checkout-data-resolver-ext': true
            },
            'Magento_Checkout/js/checkout-data': {
                'Magento_InventoryInStorePickupFrontend/js/checkout-data-ext': true
            }
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    config: {
        mixins: {
            'Magento_Swatches/js/swatch-renderer': {
                'Magento_InventorySwatchesFrontendUi/js/swatch-renderer': true
            }
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            subscriptionStatusResolver: 'Magento_Newsletter/js/subscription-status-resolver',
            newsletterSignUp:  'Magento_Newsletter/js/newsletter-sign-up'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/action/select-payment-method': {
                'Magento_SalesRule/js/action/select-payment-method-mixin': true
            },
            'Magento_Checkout/js/model/shipping-save-processor': {
                'Magento_SalesRule/js/model/shipping-save-processor-mixin': true
            },
            'Magento_Checkout/js/action/place-order': {
                'Magento_SalesRule/js/model/place-order-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            'slick': 'Magento_PageBuilder/js/resource/slick/slick',
            'jarallax': 'Magento_PageBuilder/js/resource/jarallax/jarallax',
            'jarallaxVideo': 'Magento_PageBuilder/js/resource/jarallax/jarallax-video',
            'Magento_PageBuilder/js/resource/vimeo/player': 'vimeo/player',
            'Magento_PageBuilder/js/resource/vimeo/vimeo-wrapper': 'vimeo/vimeo-wrapper',
            'jarallax-wrapper': 'Magento_PageBuilder/js/resource/jarallax/jarallax-wrapper'
        }
    },
    shim: {
        'Magento_PageBuilder/js/resource/slick/slick': {
            deps: ['jquery']
        },
        'Magento_PageBuilder/js/resource/jarallax/jarallax-video': {
            deps: ['jarallax-wrapper', 'vimeoWrapper']
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    shim: {
        cardinaljs: {
            exports: 'Cardinal'
        },
        cardinaljsSandbox: {
            exports: 'Cardinal'
        }
    },
    paths: {
        cardinaljsSandbox: 'https://includestest.ccdc02.com/cardinalcruise/v1/songbird',
        cardinaljs: 'https://songbird.cardinalcommerce.com/edge/v1/songbird'
    }
};


require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            transparent: 'Magento_Payment/js/transparent',
            'Magento_Payment/transparent': 'Magento_Payment/js/transparent'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            orderReview: 'Magento_Paypal/js/order-review',
            'Magento_Paypal/order-review': 'Magento_Paypal/js/order-review',
            paypalCheckout: 'Magento_Paypal/js/paypal-checkout'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    config: {
        mixins: {
            'Magento_Customer/js/customer-data': {
                'Magento_Persistent/js/view/customer-data-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            loadPlayer: 'Magento_ProductVideo/js/load-player',
            fotoramaVideoEvents: 'Magento_ProductVideo/js/fotorama-add-video-events',
            'vimeoWrapper': 'vimeo/vimeo-wrapper'
        }
    },
    shim: {
        vimeoAPI: {},
        'Magento_ProductVideo/js/load-player': {
            deps: ['vimeoWrapper']
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/action/place-order': {
                'Magento_CheckoutAgreements/js/model/place-order-mixin': true
            },
            'Magento_Checkout/js/action/set-payment-information': {
                'Magento_CheckoutAgreements/js/model/set-payment-information-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

// eslint-disable-next-line no-unused-vars
var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/model/place-order': {
                'Magento_ReCaptchaCheckout/js/model/place-order-mixin': true
            },
            'Magento_ReCaptchaWebapiUi/js/webapiReCaptchaRegistry': {
                'Magento_ReCaptchaCheckout/js/webapiReCaptchaRegistry-mixin': true
            }
        }
    }
};


require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/*eslint strict: ["error", "global"]*/

'use strict';

var config = {
    config: {
        mixins: {
            'Magento_Ui/js/view/messages': {
                'Magento_ReCaptchaFrontendUi/js/ui-messages-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

// eslint-disable-next-line no-unused-vars
var config = {
    config: {
        mixins: {
            'Magento_Paypal/js/view/payment/method-renderer/payflowpro-method': {
                'Magento_ReCaptchaPaypal/js/payflowpro-method-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

// eslint-disable-next-line no-unused-vars
var config = {
    config: {
        mixins: {
            'jquery': {
                'Magento_ReCaptchaWebapiUi/js/jquery-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            mageTranslationDictionary: 'Magento_Translation/js/mage-translation-dictionary'
        }
    },
    deps: [
        'mageTranslationDictionary'
    ]
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            editTrigger: 'mage/edit-trigger',
            addClass: 'Magento_Translation/js/add-class',
            'Magento_Translation/add-class': 'Magento_Translation/js/add-class'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            configurableVariationQty: 'Magento_InventoryConfigurableProductFrontendUi/js/configurable-variation-qty'
        }
    },
    config: {
        mixins: {
            'Magento_ConfigurableProduct/js/configurable': {
                'Magento_InventoryConfigurableProductFrontendUi/js/configurable': true
            }
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/view/payment/list': {
                'Magento_PaypalCaptcha/js/view/payment/list-mixin': true
            },
            'Magento_Paypal/js/view/payment/method-renderer/payflowpro-method': {
                'Magento_PaypalCaptcha/js/view/payment/method-renderer/payflowpro-method-mixin': true
            },
            'Magento_Captcha/js/view/checkout/defaultCaptcha': {
                'Magento_PaypalCaptcha/js/view/checkout/defaultCaptcha-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            'taxToggle': 'Magento_Weee/js/tax-toggle',
            'Magento_Weee/tax-toggle': 'Magento_Weee/js/tax-toggle'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    map: {
        '*': {
            wishlist:       'Magento_Wishlist/js/wishlist',
            addToWishlist:  'Magento_Wishlist/js/add-to-wishlist',
            wishlistSearch: 'Magento_Wishlist/js/search'
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map   : {
        '*': {
            // Magento FE libs
            'algoliaCommon'       : 'Algolia_AlgoliaSearch/internals/common',
            'algoliaAutocomplete' : 'Algolia_AlgoliaSearch/autocomplete',
            'algoliaInstantSearch': 'Algolia_AlgoliaSearch/instantsearch',
            'algoliaInsights'     : 'Algolia_AlgoliaSearch/insights',
            'algoliaHooks'        : 'Algolia_AlgoliaSearch/hooks',

            // Autocomplete templates
            'productsHtml'   : 'Algolia_AlgoliaSearch/internals/template/autocomplete/products',
            'pagesHtml'      : 'Algolia_AlgoliaSearch/internals/template/autocomplete/pages',
            'categoriesHtml' : 'Algolia_AlgoliaSearch/internals/template/autocomplete/categories',
            'suggestionsHtml': 'Algolia_AlgoliaSearch/internals/template/autocomplete/suggestions',
            'additionalHtml' : 'Algolia_AlgoliaSearch/internals/template/autocomplete/additional-section',

            // Recommend templates
            'recommendProductsHtml': 'Algolia_AlgoliaSearch/internals/template/recommend/products'
        }
    },
    paths : {
        'algoliaBundle'   : 'Algolia_AlgoliaSearch/internals/algoliaBundle.min',
        'algoliaAnalytics': 'Algolia_AlgoliaSearch/internals/search-insights',
        'recommend'       : 'Algolia_AlgoliaSearch/internals/recommend.min',
        'recommendJs'     : 'Algolia_AlgoliaSearch/internals/recommend-js.min',
        'rangeSlider'     : 'Algolia_AlgoliaSearch/navigation/range-slider-widget',
    },
    deps  : [
        'algoliaInstantSearch',
        'algoliaInsights'
    ],
    config: {
        mixins: {
            'Magento_Catalog/js/catalog-add-to-cart': {
                'Algolia_AlgoliaSearch/insights/add-to-cart-mixin': true
            },
        }
    }
};

require.config(config);
})();
(function() {
/**
 * Config to pull in all the relevant Braintree JS SDKs
 * @type {{paths: {braintreePayPalInContextCheckout: string, braintreePayPalCheckout: string, braintreeVenmo: string, braintreeHostedFields: string, braintreeDataCollector: string, braintreeThreeDSecure: string, braintreeGooglePay: string, braintreeApplePay: string, braintreeAch: string, braintreeLpm: string, googlePayLibrary: string}, map: {"*": {braintree: string}}}}
 */
var config = {
    map: {
        '*': {
            braintree: 'https://js.braintreegateway.com/web/3.94.0/js/client.min.js',
        }
    },

    paths: {
        "braintreePayPalCheckout": "https://js.braintreegateway.com/web/3.94.0/js/paypal-checkout.min",
        "braintreeHostedFields": "https://js.braintreegateway.com/web/3.94.0/js/hosted-fields.min",
        "braintreeDataCollector": "https://js.braintreegateway.com/web/3.94.0/js/data-collector.min",
        "braintreeThreeDSecure": "https://js.braintreegateway.com/web/3.94.0/js/three-d-secure.min",
        "braintreeApplePay": 'https://js.braintreegateway.com/web/3.94.0/js/apple-pay.min',
        "braintreeGooglePay": 'https://js.braintreegateway.com/web/3.94.0/js/google-payment.min',
        "braintreeVenmo": 'https://js.braintreegateway.com/web/3.94.0/js/venmo.min',
        "braintreeAch": "https://js.braintreegateway.com/web/3.94.0/js/us-bank-account.min",
        "braintreeLpm": "https://js.braintreegateway.com/web/3.94.0/js/local-payment.min",
        "googlePayLibrary": "https://pay.google.com/gp/p/js/pay",
        "braintreePayPalInContextCheckout": "https://www.paypalobjects.com/api/checkout"
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/model/step-navigator': {
                'PayPal_Braintree/js/model/step-navigator-mixin': true
            },
            'Magento_Checkout/js/model/place-order': {
                'PayPal_Braintree/js/model/place-order-mixin': true
            },
            'Magento_ReCaptchaWebapiUi/js/webapiReCaptchaRegistry': {
                'PayPal_Braintree/js/reCaptcha/webapiReCaptchaRegistry-mixin': true
            }
        }
    },
    map: {
        '*': {
            braintreeCheckoutPayPalAdapter: 'PayPal_Braintree/js/view/payment/adapter'
        }
    },
};

require.config(config);
})();
(function() {
/* jshint browser:true jquery:true */
var amasty_mixin_enabled = !window.amasty_checkout_disabled,
    config;

config = {
    'map': { '*': {} },
    config: {
        mixins: {
            'Magento_Checkout/js/model/new-customer-address': {
                'Amasty_CheckoutCore/js/model/new-customer-address-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/view/payment/list': {
                'Amasty_CheckoutCore/js/view/payment/list': amasty_mixin_enabled
            },
            'Magento_Checkout/js/view/summary/abstract-total': {
                'Amasty_CheckoutCore/js/view/summary/abstract-total': amasty_mixin_enabled
            },
            'Magento_Checkout/js/model/step-navigator': {
                'Amasty_CheckoutCore/js/model/step-navigator-mixin': amasty_mixin_enabled
            },
            'Magento_Paypal/js/action/set-payment-method': {
                'Amasty_CheckoutCore/js/action/set-payment-method-mixin': amasty_mixin_enabled
            },
            'Magento_CheckoutAgreements/js/model/agreements-assigner': {
                'Amasty_CheckoutCore/js/model/agreements-assigner-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/view/summary': {
                'Amasty_CheckoutCore/js/view/summary-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/view/shipping': {
                'Amasty_CheckoutCore/js/view/shipping-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/view/summary/cart-items': {
                'Amasty_CheckoutCore/js/view/summary/cart-items-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/model/payment/additional-validators': {
                'Amasty_CheckoutCore/js/model/payment-validators/additional-validators-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/model/customer-email-validator': {
                'Amasty_CheckoutCore/js/model/customer-email-validator-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/model/checkout-data-resolver': {
                'Amasty_CheckoutCore/js/model/checkout-data-resolver-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/model/shipping-rates-validator': {
                'Amasty_CheckoutCore/js/model/shipping-rates-validator-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/action/set-shipping-information': {
                'Amasty_CheckoutCore/js/action/set-shipping-information-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/model/full-screen-loader': {
                'Amasty_CheckoutCore/js/model/full-screen-loader-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/model/shipping-rate-processor/new-address': {
                'Amasty_CheckoutCore/js/model/default-shipping-rate-processor-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/view/payment': {
                'Amasty_CheckoutCore/js/view/payment-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/model/payment-service': {
                'Amasty_CheckoutCore/js/model/payment-service-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/model/address-converter': {
                'Amasty_CheckoutCore/js/model/address-converter-mixin': amasty_mixin_enabled
            },
            'Magento_Paypal/js/view/payment/method-renderer/in-context/checkout-express': {
                'Amasty_CheckoutCore/js/view/payment/method-renderer/in-context/checkout-express-mixin':
                    amasty_mixin_enabled
            },

            // in Magento 2.4 module Magento_Braintree renamed to Paypal_Braintree
            'Magento_Braintree/js/view/payment/method-renderer/paypal': {
                'Amasty_CheckoutCore/js/view/payment/method-renderer/braintree/paypal-mixin':
                    amasty_mixin_enabled
            },
            'PayPal_Braintree/js/view/payment/method-renderer/paypal': {
                'Amasty_CheckoutCore/js/view/payment/method-renderer/braintree/paypal-mixin':
                    amasty_mixin_enabled
            },
            'Magento_Braintree/js/view/payment/method-renderer/cc-form': {
                'Amasty_CheckoutCore/js/view/payment/method-renderer/braintree/cc-form-mixin': amasty_mixin_enabled
            },
            'PayPal_Braintree/js/view/payment/method-renderer/cc-form': {
                'Amasty_CheckoutCore/js/view/payment/method-renderer/braintree/cc-form-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/view/billing-address': {
                'Amasty_CheckoutCore/js/view/billing-address-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/view/payment/default': {
                'Amasty_CheckoutCore/js/view/payment/method-renderer/default-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/model/shipping-rate-registry': {
                'Amasty_CheckoutCore/js/model/shipping-rate-registry-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/view/shipping-address/address-renderer/default': {
                'Amasty_CheckoutCore/js/view/shipping-address/address-renderer/default-mixin': amasty_mixin_enabled
            },
            'Amasty_Gdpr/js/model/consents-assigner': {
                'Amasty_CheckoutCore/js/model/consents-assigner-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/action/select-payment-method': {
                // Disable hardcoded save payment information
                // @see Amasty_CheckoutCore/js/model/payment/salesrule-observer
                'Magento_SalesRule/js/action/select-payment-method-mixin': !amasty_mixin_enabled
            }
        }
    }
};

if (amasty_mixin_enabled) {
    config.map['*'] = {
        checkoutCollapsibleSteps: 'Amasty_CheckoutCore/js/view/checkout/design/collapsible-steps',
        summaryWidget: 'Amasty_CheckoutCore/js/view/summary/summary-widget',
        stickyWidget: 'Amasty_CheckoutCore/js/view/summary/sticky-widget',
        'Magento_Checkout/template/payment-methods/list.html': 'Amasty_CheckoutCore/template/payment-methods/list.html',
        'Magento_Checkout/template/billing-address/details.html':
            'Amasty_CheckoutCore/template/onepage/billing-address/details.html',
        'Magento_Checkout/js/action/get-totals': 'Amasty_CheckoutCore/js/action/get-totals',
        'Magento_Checkout/js/model/shipping-rate-service': 'Amasty_CheckoutCore/js/model/shipping-rate-service-override',
        'Magento_Checkout/js/action/recollect-shipping-rates': 'Amasty_CheckoutCore/js/action/recollect-shipping-rates'
    };
}

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/model/shipping-rates-validation-rules': {
                'Amasty_Conditions/js/model/shipping-rates-validation-rules-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            'amcformPrompt': 'Amasty_Customform/js/form-prompt',
            'amcformMessageList': 'Magento_Ui/js/model/messageList'
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            'amScrollToTabs': 'Amasty_CustomTabs/js/scroll-to-tabs'
        }
    },
    config: {
        mixins: {
            "Magento_Review/js/process-reviews": {
                'Amasty_CustomTabs/js/process-reviews': true
            },
            'mage/collapsible': {
                'Amasty_CustomTabs/js/collapsible-mixin': true
            },
            'mage/tabs': {
                'Amasty_CustomTabs/js/tabs-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/action/set-shipping-information': {
                'Amasty_CustomerAttributes/js/action/set-shipping-information-mixin': true
            },
            'Magento_Checkout/js/model/new-customer-address': {
                'Amasty_CustomerAttributes/js/model/new-customer-address-mixin': true
            },
            'Magento_Checkout/js/view/shipping-information/address-renderer/default': {
                'Amasty_CustomerAttributes/js/mixin-fix-get-custom-attribute-label': true
            },
            'Magento_Checkout/js/view/billing-address': {
                'Amasty_CustomerAttributes/js/mixin-fix-get-custom-attribute-label': true
            },
            'Magento_Checkout/js/view/shipping-address/address-renderer/default': {
                'Amasty_CustomerAttributes/js/mixin-fix-get-custom-attribute-label': true
            },
            'Temando_Shipping/js/view/checkout/shipping-information/address-renderer/shipping' : {
                'Amasty_CustomerAttributes/js/Temando/shipping-address-renderer-fix': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/model/resource-url-manager': {
                'Amasty_Extrafee/js/model/resource-url-manager-mixin': true
            },
            'Magento_Checkout/js/view/shipping': {
                'Amasty_Extrafee/js/view/shipping-mixin': true
            },
            'Magento_Checkout/js/view/payment/default': {
                'Amasty_Extrafee/js/view/payment/default-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
/* eslint-disable camelcase */
var amasty_mixin_enabled = !window.amasty_checkout_disabled,
    config;

config = {
    config: {
        mixins: {
            'Magento_Checkout/js/view/billing-address': {
                'Amasty_Checkout/js/view/billing-address-mixin': amasty_mixin_enabled
            },
            'Magento_Checkout/js/view/shipping': {
                'Amasty_Checkout/js/view/shipping-mixin': amasty_mixin_enabled
            }
        }
    },
    shim: {
        'Amasty_CheckoutCore/js/view/onepage': [
            'Amasty_Checkout/js/validation/phone-validation'
        ]
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Magento_Paypal/js/view/payment/method-renderer/in-context/checkout-express': {
                'Amasty_InvisibleCaptcha/js/view/paypal/in-context/checkout-express-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            slickSlider: 'Amasty_JetTheme/js/components/am-slider',
            amThemeSlick: 'Amasty_Base/vendor/slick/slick.min'
        }
    },
    shim: {
        slickSlider: {
            deps: [ 'Amasty_Base/vendor/slick/slick.min' ]
        },
        amThemeSlick: {
            deps: [ 'jquery' ]
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        "*": {
            "amcformGridDataProvider": "Amasty_CustomFormsPro/js/customer_account/grid/data-provider",
            "removeRecord": "Amasty_CustomFormsPro/js/components/amRemoveRecord",
            "editRecord": "Amasty_CustomFormsPro/js/components/amEditRecord",
            "amViewPageActions": "Amasty_CustomFormsPro/js/customer_account/view_page/actions",
            "amcformNotifications": "Amasty_CustomFormsPro/js/components/notifications"
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            'ammenu_helpers': 'Amasty_MegaMenuLite/js/utils/helpers',
            'ammenu_color_helper': 'Amasty_MegaMenuLite/js/utils/color'
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        "*": {
            ammenuProductSlider: "Amasty_MegaMenu/js/widgets/product-slider",
            ammenuPager: "Amasty_MegaMenu/js/widgets/pager"
        }
    },
    config: {
        mixins: {
            'Amasty_MegaMenuLite/js/wrapper': {
                'Amasty_MegaMenu/js/wrapper': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Amasty_MegaMenuLite/js/wrapper': {
                'Amasty_MegaMenuPremium/js/wrapper': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Magento_Catalog/js/catalog-add-to-cart': {
                'Amasty_RequestQuote/js/product/catalog-add-to-cart': true
            },
            'mage/sticky': {
                'Amasty_RequestQuote/js/mage/amquote-sticky': true
            },
            'Magento_Checkout/js/sidebar': {
                'Amasty_RequestQuote/js/sidebar/modify-remove-request': true
            },
            'Amasty_CheckoutCore/js/view/checkout/summary/item/details': {
                'Amasty_RequestQuote/js/view/checkout/summary/item/details/modify-remove-request': true
            }
        }
    },
    shim: {
        'Magento_Checkout/js/view/shipping': {
            deps: [ 'Amasty_RequestQuote/js/actions/shipping/add-address' ]
        },
        'Magento_Checkout/js/view/shipping-address/list': {
            deps: [ 'Amasty_RequestQuote/js/actions/shipping/add-address' ]
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    shim: {
        'Amasty_RequestQuote/js/quote/submit': {
            deps: [
                'Amasty_QuoteAttributes/js/quote/submit/add-validation',
                'Amasty_QuoteAttributes/js/quote/submit/rewrite-data-from-provider'
            ]
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            amShopbyFilterAbstract: 'Amasty_ShopbyLite/js/amShopby',
            amShopbyFilterItemDefault: 'Amasty_ShopbyLite/js/amShopby',
            amShopbyFilterDropdown: 'Amasty_ShopbyLite/js/amShopby',
            amShopbyFilterFromTo: 'Amasty_ShopbyLite/js/amShopby',
            amShopbyFilterSlider: 'Amasty_ShopbyLite/js/amShopby',
            amShopbyAjax: 'Amasty_ShopbyLite/js/amShopbyAjax',
            amShopbyFilterMultiselect: 'Amasty_ShopbyLite/js/amShopby',
            amShopbyApplyFilters: 'Amasty_ShopbyLite/js/amShopbyApplyFilters',
            amShopbyFilterContainer: 'Amasty_ShopbyLite/js/amShopby'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2019 Amasty (https://www.amasty.com)
 * @package Amasty_ThankYouPage
 */

var config = {
    map: {
        '*': {
            amThankYouPageCreateAccountForm: 'Amasty_ThankYouPage/js/create-account-form',
            amThankYouPageSubscribeToNewsletter: 'Amasty_ThankYouPage/js/subscribe-to-newsletter'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * ClassyLlama_AvaTax
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 *
 * @copyright  Copyright (c) 2016 Avalara, Inc.
 * @license    http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */
var config = {
    map: {
        '*': {
            addressValidationModal: 'ClassyLlama_AvaTax/js/view/address-validation-modal'
        }
    }
};

require.config(config);
})();
(function() {
/**
 * ClassyLlama_AvaTax
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 *
 * @copyright  Copyright (c) 2016 Avalara, Inc.
 * @license    http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */

var config = {
    map: {
        '*': {
            "Magento_Checkout/js/model/shipping-save-processor/gift-registry": 'ClassyLlama_AvaTax/js/model/shipping-save-processor/gift-registry',
            "Magento_Tax/template/checkout/cart/totals/tax": 'ClassyLlama_AvaTax/template/checkout/cart/totals/tax',
            "Magento_Checkout/template/payment-methods/list": 'ClassyLlama_AvaTax/template/payment-methods/list',
            "Magento_Tax/template/checkout/summary/tax": 'ClassyLlama_AvaTax/template/checkout/summary/tax',
            multiShippingAddressValidation: 'ClassyLlama_AvaTax/js/multishipping-address-validation',
            // Add the following alias to provide compatibility with Magento 2.2
            addressValidation: 'ClassyLlama_AvaTax/js/addressValidation',
            deleteCertificate: 'ClassyLlama_AvaTax/js/delete-certificate',
            checkoutBillingAddressValidationModal: 'ClassyLlama_AvaTax/js/view/checkout-billing-address-validation-modal'
        }
    },
    config: {
        mixins: {
            'Magento_Checkout/js/view/payment/list': {
                'ClassyLlama_AvaTax/js/view/payment/list/certificates-link': true
            },
            'Magento_Tax/js/view/checkout/summary/tax': {
                'ClassyLlama_AvaTax/js/view/checkout/summary/tax/mixin': true,
                'ClassyLlama_AvaTax/js/view/payment/list/certificates-link': true
            },
            'Magento_Tax/js/view/checkout/cart/totals/tax': {
                'ClassyLlama_AvaTax/js/view/checkout/summary/tax/mixin': true
            },
            'Magento_Checkout/js/view/estimation': {
                // We can leverage the same login from the tax summary to determine if we have customs
                'ClassyLlama_AvaTax/js/view/checkout/summary/tax/mixin': true,
                'ClassyLlama_AvaTax/js/view/estimation/mixin': true
            },
            'Magento_Checkout/js/model/step-navigator': {
                'ClassyLlama_AvaTax/js/model/step-navigator/mixin': true
            },
            'ClassyLlama_AvaTax/js/action/account-add-exemption': {
                'ClassyLlama_AvaTax/js/customer-account-add-exemption': true
            },
            'Magento_Checkout/js/model/shipping-save-processor/default': {
                'ClassyLlama_AvaTax/js/model/shipping-save-processor/default': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            KlaviyoCustomerData: 'Klaviyo_Reclaim/js/customer',
        }
    },
    config: {
        mixins: {
            'Magento_Checkout/js/model/shipping-save-processor/payload-extender': {
                'Klaviyo_Reclaim/js/mixin/shipping-payload-extender-mixin': true
            },
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'mage/gallery/gallery': {
                'Magefan_WebP/js/gallery/gallery-mixin': true
            },
            'Magento_Swatches/js/swatch-renderer': {
                'Magefan_WebP/js/swatch-renderer-mixin': true
            },
            'Aimes_Notorama/js/notorama': {
                'Magefan_WebP/js/gallery/notorama-mixin': true
            },
            'Xumulus_FastGalleryLoad/js/gallery/custom_gallery': {
                'Magefan_WebP/js/gallery/gallery-mixin': true
            },
            'Codazon_ProductFilter/js/product-gallery': {
                'Magefan_WebP/js/codazon/product-gallery-mixin': true
            },
            'js/theme-widgets': {
                'Magefan_WebP/js/codazon/theme-widgets-mixin': true
            },
            'Magento_Catalog/js/product/list/columns/image' : {
                'Magefan_WebP/js/product/list/columns/image-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            weltpixel_ga4_gtm: 'WeltPixel_GA4/js/weltpixel_ga4_gtm',
            weltpixel_ga4_persistentLayer: 'WeltPixel_GA4/js/weltpixel_ga4_persistentlayer'
        }
    },
    config: {
        mixins: {
            'Magento_Swatches/js/swatch-renderer': {
                'WeltPixel_GA4/js/swatch-renderer': true
            },
            'Magento_ConfigurableProduct/js/configurable': {
                'WeltPixel_GA4/js/configurable': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            owl_carousel: 'WeltPixel_OwlCarouselSlider/js/owl.carousel',
            owl_config: 'WeltPixel_OwlCarouselSlider/js/owl.config',
            owlAjax: 'WeltPixel_OwlCarouselSlider/js/owlAjax'
        }
    },
    shim: {
        owl_carousel: {
            deps: ['jquery']
        },
        owl_config: {
            deps: ['jquery','owl_carousel']
        },
        owlAjax: {
            deps: ['jquery','owl_carousel', 'owl_config']
        }
    }
};
require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            'sociallogin': 'WeltPixel_SocialLogin/js/sociallogin',
            'slReferer': 'WeltPixel_SocialLogin/js/slreferer'
        }
    }
};
require.config(config);
})();
(function() {
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    deps: [
        'Magento_Theme/js/theme'
    ]
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            backTop: 'Magento_Theme/js/components/back-to-top',
            amMenu: 'Magento_Theme/js/components/am-menu',
            amQty: 'Magento_Theme/js/components/am-qty',
            amSelect: 'Magento_Theme/js/components/am-select',
            amFileUpload: 'Magento_Theme/js/components/am-file-upload',
            amStickyHeader: 'Magento_Theme/js/components/am-sticky-header'
        }
    },

    config: {
        mixins: {
            'mage/validation': {
                'Magento_Theme/js/lib/mage/validation-mixin': true
            },
            'mage/menu': {
                'Magento_Theme/js/lib/mage/menu-mixin': true
            },
            'Magento_Theme/js/view/messages': {
                'Magento_Theme/js/view/messages-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'quickSearch': {
                'Magento_Search/js/form-mini-mixin': true
            },
            'Magento_Search/js/form-mini': {
                'Magento_Search/js/form-mini-mixin': true
            }
        }
    },
    map: {
        '*': {
            amSearch: 'Magento_Search/js/am-search'
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            amProductTabCaret: 'Magento_Catalog/js/am-product-tab-caret',
            amReviewTab: 'Magento_Catalog/js/am-review-tab',
            productPriceBox: 'Magento_Catalog/js/product-price',
            amProductCaret: 'Magento_Catalog/js/am-product-caret',
            amStickyAddToCart: 'Magento_Catalog/js/am-sticky-addtocart',
            amCompareList: 'Magento_Catalog/js/am-compare-list',
            amStickyCompareLink: 'Magento_Catalog/js/am-sticky-compare-link',
            amAjaxCart: 'Magento_Catalog/js/am-ajax-cart',
            amAjaxCompare: 'Magento_Catalog/js/am-ajax-compare',
            amQuickView: 'Magento_Catalog/js/am-quick-view',
            amHoverImages: 'Magento_Catalog/js/am-hover-images'
        }
    },

    config: {
        mixins: {
            'Magento_Catalog/js/price-options': {
                'Magento_Catalog/js/price-options-mixin': true
            },
            'Magento_Catalog/product/view/validation': {
                'Magento_Catalog/js/product/view/validation-mixin': true
            },
            'Magento_Catalog/js/catalog-add-to-cart': {
                'Magento_Catalog/js/catalog-add-to-cart-mixin': true
            },
            'Magento_Catalog/js/product/addtocart-button': {
                'Magento_Catalog/js/product/addtocart-button-mixin': true
            },
            'Magento_Catalog/js/product/addtocompare-button': {
                'Magento_Catalog/js/product/addtocompare-button-mixin': true
            },
            'Magento_Catalog/js/view/compare-products': {
                'Magento_Catalog/js/view/compare-products-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            amAdvancedSearchValidation: 'Magento_CatalogSearch/js/am-advanced-search-form-validation'
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            amReorderValidation: 'Magento_Sales/js/am-reorder-validation'
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/view/summary': {
                'Magento_Checkout/js/view/summary-mixin': true
            },
            'Magento_Checkout/js/view/shipping': {
                'Magento_Checkout/js/view/shipping-mixin': true
            },
            'Magento_Checkout/js/view/shipping-information': {
                'Magento_Checkout/js/view/shipping-information-mixin': true
            },
            'Magento_Checkout/js/view/shipping-address/address-renderer/default': {
                'Magento_Checkout/js/view/shipping-address/address-renderer/default-mixin': true
            },
            'Magento_Checkout/js/shopping-cart': {
                'Magento_Checkout/js/shopping-cart-mixin': true
            },
            'Magento_Checkout/js/view/minicart': {
                'Magento_Checkout/js/view/minicart-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Magento_Downloadable/js/downloadable': {
                'Magento_Downloadable/js/downloadable-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            amBundleVisibility: 'Magento_Bundle/js/ambundle'
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            amLayeredNavigationToggle: 'Magento_LayeredNavigation/js/am-layered-navigation-toggle',
            amLayeredNavigationMobile: 'Magento_LayeredNavigation/js/am-layered-navigation-mobile',
            amLayeredNavigationAction: 'Magento_LayeredNavigation/js/am-layered-navigation-action'
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Magento_ProductVideo/js/fotorama-add-video-events': {
                'Magento_ProductVideo/js/fotorama-add-video-events-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Magento_ReCaptchaFrontendUi/js/reCaptcha': {
                'Magento_ReCaptchaFrontendUi/js/reCaptcha-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Magento_ReCaptchaWebapiUi/js/webapiReCaptcha': {
                'Magento_ReCaptchaWebapiUi/js/webapiReCaptcha-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Magento_Swatches/js/swatch-renderer': {
                'Magento_Swatches/js/swatch-renderer-mixin': true
            },
            'Amasty_Conf/js/swatch-renderer': {
                'Magento_Swatches/js/swatch-renderer-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    map: {
        '*': {
            amJetShowMore: 'Magento_Wishlist/js/am-show-more',
            amAjaxWishlist: 'Magento_Wishlist/js/am-ajax-wishlist'
        }
    },
    config: {
        mixins: {
            'Magento_Wishlist/js/add-to-wishlist': {
                'Magento_Wishlist/js/add-to-wishlist-mixin': true
            },
            'Magento_Wishlist/js/product/addtowishlist-button': {
                'Magento_Wishlist/js/product/addtowishlist-button-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'Amasty_ShopbyLite/js/amShopbyAjax': {
                'Amasty_ShopbyLite/js/amShopbyAjax-mixin': true
            }
        }
    }
};

require.config(config);
})();
(function() {
var config = {
    config: {
        mixins: {
            'mage/gallery/gallery': {
                'js/gallery/gallery-mixin': true
            },
            'mage/collapsible': {
                'js/mage/collapsible-mixin': true
            },
            'mage/validation': {
                'js/mage/validation-mixin': true
            }
        }
    },
    map: {
        '*': {
            amPopup: 'js/am-popup',
            amCollapsible: 'js/am-collapsible',
            'fotorama/fotorama': 'js/gallery/fotorama-custom'
        }
    },
    paths: {
        slick: 'Amasty_Base/vendor/slick/slick.min'
    },
    shim: {
        slick: {
            deps: [ 'jquery' ]
        }
    }
};

require.config(config);
})();



})(require);