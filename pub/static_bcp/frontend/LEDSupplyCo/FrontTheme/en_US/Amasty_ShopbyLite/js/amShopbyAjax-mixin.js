/**
 * Mixin for compatibility Amasty ILN Lite with Jet Theme
 */
define([
    'jquery'
], function ($) {
    'use strict';

    var amShopbyAjaxMixin = {
        scrollToSelector: '.top-toolbar > .toolbar',

        /**
         * Scroll to top of element in Jet Theme
         * @param {jQuery|Object} element
         * @returns {void}
         */
        scrollUpAfterAjax: function (element) {
            var scrollElement = element.find(this.scrollToSelector),
                scrollTo = scrollElement.length ? scrollElement : element;

            $(document).scrollTop(scrollTo.offset().top);
        }
    };

    return function (targetWidget) {
        $.widget('mage.amShopbyAjax', targetWidget, amShopbyAjaxMixin);

        return $.mage.amShopbyAjax;
    };
});
