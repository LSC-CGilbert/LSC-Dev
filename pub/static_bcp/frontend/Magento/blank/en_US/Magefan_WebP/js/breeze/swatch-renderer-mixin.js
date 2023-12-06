/**
 * Copyright © Magefan (support@magefan.com). All rights reserved.
 * Please visit Magefan.com for license details (https://magefan.com/end-user-license-agreement).
 */

(function () {
    'use strict';

    $.mixin('SwatchRenderer', {
      
        
            /**
             * Update [gallery-placeholder] or [product-image-photo]
             * @param {Array} images
             * @param {jQuery} context
             * @param {Boolean} isInProductView
             */
            updateBaseImage: function (original, images, context, isInProductView, eventName) {
                var canUseWebP = MagefanWebP.canUseWebP();

                if (!canUseWebP) {
                    console.log("don't support webp (swatch)");
                    for (var i = 0; i < images.length; i++) {

                        if (images[i].img && images[i].img.indexOf('/mf_webp/') != -1) {
                            images[i].img = MagefanWebP.getOriginWebPImage(images[i].img);
                            if (images[i].full) {
                                images[i].full = MagefanWebP.getOriginWebPImage(images[i].full);
                            }
                            if (images[i].thumb) {
                                images[i].thumb = MagefanWebP.getOriginWebPImage(images[i].thumb);
                            }
                        }
                    }
                }

                original(images, context, isInProductView, eventName);

                if (canUseWebP) {
                    if (!isInProductView) {
                        var justAnImage = images[0];
                        if (justAnImage && justAnImage.img) {
                            // here we changing picture src
                            context.find('.product-image-photo').parent().find('source').attr('srcset', justAnImage.img);
                        }
                    }
                }
            },

            _init: function (original) {
                if (this.options.jsonSwatchConfig && MagefanWebP.canUseWebP()) {
                    for (let attributeId in this.options.jsonSwatchConfig) {
                        for (let optionId in this.options.jsonSwatchConfig[attributeId]) {
                            if (this.options.jsonSwatchConfig[attributeId][optionId].type == 2) {
                                this.options.jsonSwatchConfig[attributeId][optionId].value = MagefanWebP.getWebUrl(this.options.jsonSwatchConfig[attributeId][optionId].value);
                                this.options.jsonSwatchConfig[attributeId][optionId].thumb = MagefanWebP.getWebUrl(this.options.jsonSwatchConfig[attributeId][optionId].thumb);
                            }
                        }
                    }
                }

                original();
            }
    });

})();
