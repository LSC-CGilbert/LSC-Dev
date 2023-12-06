/**
 * Mixin for compare-products
 */

define([
    'jquery',
    'underscore',
    'Magento_Catalog/js/action/am-product-actions'
], function ($, _, amProductActions) {
    'use strict';

    var mixin = {
        /** @inheritDoc */
        initialize: function () {
            this._super();

            this.compareProducts.subscribe(function () {
                amProductActions.highlightComparedProducts();
            });

            $('body').on('popup.amContentUpdated', function () {
                amProductActions.highlightComparedProducts();
            });

            amProductActions.highlightComparedProducts();
        }
    };

    return function (CompareProducts) {
        return CompareProducts.extend(mixin);
    };
});
