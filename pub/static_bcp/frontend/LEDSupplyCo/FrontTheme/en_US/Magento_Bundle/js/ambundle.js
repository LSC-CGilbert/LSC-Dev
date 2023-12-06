/**
 * Switching the visibility of a product options form in a bundle product
 */

define([
    'jquery'
], function ($) {
    'use strict';

    $.widget('am.bundleVisibility', {
        options: {
            buttonSelector: '#bundle-slide',
            backSelector: '.action.customization.-back',
            autostart: false,
            productInfoSelector: '.product-info-main > .product.attribute.overview,'
                + '.product-info-main > .product-info-price,'
                + '.product-info-main > .amtheme-actions-wrap',
            addFormSelector: '.product-add-form'
        },

        /**
         * @private
         * @returns {void}
         */
        _create: function () {
            var self = this,
                options = self.options,
                butonStart = $(options.buttonSelector),
                backButton = $(options.backSelector);

            self.addForm = $(options.addFormSelector);
            self.productInfo = $(options.productInfoSelector);

            butonStart.on('click', function () {
                self.showForm();
            });

            backButton.on('click', function () {
                self.hideForm();
            });

            if (options.autostart) {
                self.showForm();
            }
        },

        /**
         * @returns {void}
         */
        showForm: function () {
            this.productInfo.hide();
            this.addForm.fadeIn();
        },

        /**
         * @returns {void}
         */
        hideForm: function () {
            this.addForm.hide();
            this.productInfo.fadeIn();
        }
    });

    return $.am.bundleVisibility;
});
