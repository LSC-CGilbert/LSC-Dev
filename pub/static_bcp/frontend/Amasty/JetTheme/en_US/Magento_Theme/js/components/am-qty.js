/**
 *   Qty increment-decrement functionality
 *
 *   @param {String} plusSelector - selector for plus button
 *   @param {String} minusSelector - selector for minus button
 *   @param {String} inputSelector - selector for input qty
 */

define([
    'jquery'
], function ($) {
    'use strict';

    $.widget('mage.amQty', {
        options: {
            plusSelector: '[data-amtheme-js="qty-plus"]',
            minusSelector: '[data-amtheme-js="qty-minus"]',
            inputSelector: '[data-amtheme-js="qty-input"]',
            isGrouped: false
        },

        /**
         * Widget initialization
         * @private
         * @returns {void}
         */
        _create: function () {
            var self = this,
                qty = self.element,
                plusButton = qty.find(self.options.plusSelector),
                minusButton = qty.find(self.options.minusSelector);

            self.inputQty = qty.find(self.options.inputSelector);

            plusButton.on('click', function () {
                self.increment();
                self.toogleInputChange();
            });

            plusButton.on('keydown', function (e) {
                switch (e.keyCode) {
                    case 13:
                        if (!self._checkIsDisableInput(self.inputQty)) {
                            self.increment();
                        }

                        break;
                    default:
                        break;
                }
            });

            minusButton.on('click', function () {
                self.decrement();
                self.toogleInputChange();
            });

            minusButton.on('keydown', function (e) {
                switch (e.keyCode) {
                    case 13:
                        if (!self._checkIsDisableInput(self.inputQty)) {
                            self.decrement();
                        }

                        break;
                    default:
                        break;
                }
            });
        },

        /**
         * Increment input value
         * @returns {void}
         */
        increment: function () {
            var value = this.inputQty.val();

            this.inputQty.val(++value);
        },

        /**
         * Decrement input value
         * @returns {void}
         */
        decrement: function () {
            var value = this.inputQty.val(),
                minQty = this.isGrouped() ? 0 : 1;

            if (value > minQty) {
                this.inputQty.val(--value);
            }
        },

        /**
         * @return {boolean}
         */
        isGrouped: function () {
            return this.options.isGrouped;
        },

        /**
         * @returns {void}
         */
        toogleInputChange: function () {
            this.inputQty.trigger('change');
        },

        /**
         * Check input is disabled or not
         *
         * @param {Object} [input]
         * @private
         * @returns {boolean}
         */
        _checkIsDisableInput: function (input) {
            return !!input.prop('disabled');
        }
    });

    return $.mage.amQty;
});
