define([
    'jquery',
    'Magento_Catalog/js/action/am-product-actions'
], function ($, amProductActions) {
    'use strict';

    var mixin = {
        /**
         * @param {HTMLElement} uiElement
         * @returns {void}
         */
        afterRenderHandler: function (uiElement) {
            amProductActions.highlightIcon(uiElement);
        }
    };

    return function (target) {
        return target.extend(mixin);
    };
});
