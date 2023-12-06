/**
 * Copyright © Magefan (support@magefan.com). All rights reserved.
 * Please visit Magefan.com for license details (https://magefan.com/end-user-license-agreement).
 */
define([
    'jquery',
    'underscore',
    'mage/utils/wrapper'
], function ($, _, wrapper) {
    'use strict';

    function prepareConfig(config)
    {
        if (config.data && config.data.length) { 
            if (!MagefanWebP.canUseWebP()) {
                console.log("don't support webp");
                for (var i = 0; i < config.data.length; i++) {

                    if (config.data[i].img && config.data[i].img.indexOf('/mf_webp/') != -1) {
                        config.data[i].img = MagefanWebP.getOriginWebPImage(config.data[i].img);
                        if (config.data[i].full) {
                            config.data[i].full = MagefanWebP.getOriginWebPImage(config.data[i].full);
                        }
                        if (config.data[i].thumb) {
                            config.data[i].thumb = MagefanWebP.getOriginWebPImage(config.data[i].thumb);
                        }
                    }
                }
            }
        }

        return config;
    }

    return function (gallery) {
        if (gallery.extend) {
            return gallery.extend({
                initialize: function (config, element) {
                    return this._super(prepareConfig(config), element);
                }
            });
        } else if (typeof gallery === 'function') {
            /* Factly gallery mixin is in use */
            return wrapper.wrap(gallery, function (initialize, config, element) {
                initialize(prepareConfig(config), element);
            });
        }

    };
});
