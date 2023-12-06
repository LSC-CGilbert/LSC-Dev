/**
 * Mixin for shipping information method
 */
define([
    'jquery',
    'Magento_Checkout/js/model/quote',
    'Magento_Tax/js/view/checkout/summary/shipping',
    'mage/translate'
], function ($, quote, shipping) {
    'use strict';

    /**
     * Get Shipping Method Title without carrier title
     * return {string}
     */
    var mixin = {
        getShippingMethodTitleWithPrice: function () {
            var shippingMethod = quote.shippingMethod(),
                shippingMethodTitle = '';

            if (!shippingMethod) {
                return '';
            }

            if (typeof shippingMethod['method_title'] !== 'undefined') {
                shippingMethodTitle = shippingMethod['method_title'];
            } else {
                shippingMethodTitle = shippingMethod['carrier_title'];
            }

            return shippingMethodTitle;
        },

        /**
         * Get price of selected shipping method
         * @return {string}
         */
        getMethodPrice: function () {
            var value = '',
                summaryShipping = shipping(),
                title = $.mage.__('Excl. Tax');

            if (summaryShipping.isBothPricesDisplayed()) {
                value = summaryShipping.getIncludingValue() + ', ' + title + ' ' + summaryShipping.getExcludingValue();
            } else if (summaryShipping.isIncludingDisplayed()) {
                value = summaryShipping.getIncludingValue();
            } else if (summaryShipping.isExcludingDisplayed()) {
                value = summaryShipping.getValue();
            }

            return value;
        }
    };

    return function (ShippingInfo) {
        return ShippingInfo.extend(mixin);
    };
});
