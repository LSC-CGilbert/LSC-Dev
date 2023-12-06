define([
    'jquery',
    'mage/mage',
    'amAjaxCart'
], function ($) {
    'use strict';

    var mixin = {
        /**
         * @param {Object} ui
         * @return {boolean|*}
         */
        isAjaxEnabled: function (ui) {
            return ui.isAjaxEnabled;
        },

        /**
         *
         * @param {DOM} element
         * @return {void}
         */
        setAjaxAction: function (element) {
            var self = this;

            $(element).mage('amAjaxCart', {
                'actionUrl': self.ajaxCartUrl,
                'classes': {
                    'addToCartButtonDisable': 'disabled'
                }
            });
        }
    };

    return function (target) {
        return target.extend(mixin);
    };
});
