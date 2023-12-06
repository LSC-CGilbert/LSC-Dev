/**
 * mixin for add-to-cart.js
 */

define([
    'jquery',
    'mage/translate'
], function ($, $t) {
    'use strict';

    return function (widget) {
        $.widget('mage.catalogAddToCart', widget, {
            options: {
                addToCartButtonText: {
                    added: $t('Added'),
                    default: $t('Add to Cart')
                },
                disabledClass: 'disabled',
                showSpinnerClass: '-show-spinner',
                addedToCartState: '-adding-complete',
                delay: 2500
            },

            /**
             * @inheritDoc
             * @return {void}
             */
            _create: function () {
                this._super();

                // eslint-disable-next-line max-len
                this.options.addToCartButtonDisabledClass = this.options.disabledClass + ' ' + this.options.showSpinnerClass;
            },

            /**
             * @param {String} form
             * @return {void}
             */
            enableAddToCartButton: function (form) {
                var self = this,
                    addToCartButtonTextAdded = this.options.addToCartButtonTextAdded
                        || this.options.addToCartButtonText.added,
                    addToCartButton = $(form).find(this.options.addToCartButtonSelector);

                addToCartButton
                    .addClass(this.options.addedToCartState)
                    .removeClass(this.options.disabledClass);
                addToCartButton.find('span').text(addToCartButtonTextAdded);
                addToCartButton.attr('title', addToCartButtonTextAdded);

                setTimeout(function () {
                    var addToCartButtonTextDefault = self.options.addToCartButtonTextDefault
                        || self.options.addToCartButtonText.default;

                    addToCartButton
                        .removeClass(self.options.showSpinnerClass)
                        .removeClass(self.options.addedToCartState);
                    addToCartButton.find('span').text(addToCartButtonTextDefault);
                    addToCartButton.attr('title', addToCartButtonTextDefault);
                }, self.options.delay);
            }
        });

        return $.mage.catalogAddToCart;
    };
});
