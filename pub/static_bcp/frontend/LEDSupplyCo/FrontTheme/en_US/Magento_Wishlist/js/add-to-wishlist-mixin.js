/**
 * Mixin for addToWishlist
 */
define([
    'ko',
    'jquery',
    'underscore',
    'Magento_Customer/js/customer-data',
    'Magento_Catalog/js/action/am-product-actions'
], function (ko, $, _, customerData, amProductActions) {
    'use strict';

    var amAddToWishlistMixin = {
        /** @inheritdoc */
        _create: function () {
            this._super();

            this.wishlist = customerData.get('wishlist');

            this.wishlist.subscribe(function () {
                amProductActions.highlightWishlistProducts();
            }, this);

            amProductActions.highlightWishlistProducts();
        }
    };

    return function (targetWidget) {
        $.widget('mage.addToWishlist', targetWidget, amAddToWishlistMixin);

        return $.mage.addToWishlist;
    };
});
