/**
 * Product actions
 */

/** @api */

define([
    'jquery',
    'underscore',
    'Magento_Customer/js/customer-data'
], function ($, _, customerData) {
    'use strict';

    return {
        compareProductSelector: '.action.tocompare',
        wishlistProductSelector: '.action.towishlist, .amtheme-wishlist-split .action.split',
        classes: {
            selected: '-selected'
        },
        compareProducts: customerData.get('compare-products'),
        wishlistProducts: customerData.get('wishlist'),

        /**
         * @private
         * @returns {null|Array}
         */
        _getWishListProductsIds: function () {
            var wishlist = this.wishlistProducts();

            if (_.has(wishlist, 'product_ids')) {
                return wishlist.product_ids;
            }

            return null;
        },

        /**
         * @private
         * @returns {Object}
         */
        highlightWishlistProducts: function () {
            this.productsId = this._getWishListProductsIds();

            _.each($(this.wishlistProductSelector), function (element) {
                this.highlightIcon(element);
            }.bind(this));

            return this;
        },

        /**
         * @returns {void}
         */
        highlightComparedProducts: function () {
            _.each($(this.compareProductSelector), function (element) {
                this.highlightIcon(element);
            }.bind(this));
        },

        /**
         * @param {HTMLElement} element
         * @returns {void}
         */
        highlightIcon: function (element) {
            var $element = $(element),
                $svgIcon = this._getProductIcon($element),
                productId = this._getProductId($element),
                idsList = $element.hasClass('tocompare') ? this._normalizeComparedProductsIds() : this.productsId;

            // eslint-disable-next-line no-unused-expressions
            _.contains(idsList, productId) && $svgIcon.length
                ? $svgIcon.addClass(this.classes.selected)
                : $svgIcon.removeClass(this.classes.selected);
        },

        /**
         * @private
         * @returns {Array}
         */
        _normalizeComparedProductsIds: function () {
            var idsArray = [];

            _.each(this.compareProducts().items, function (item) {
                idsArray.push(item.id);
            });

            return idsArray;
        },

        /**
         * @private
         * @param {jQuery} element
         * @returns {string|null}
         */
        _getProductId: function (element) {
            var postData = element.data('post'),
                productId = null;

            if (!postData && _.has(postData, 'data')) {
                return productId;
            }

            if (_.has(postData.data, 'product')) {
                productId = postData.data.product.toString();
            }

            if (_.has(postData.data, 'item')) {
                productId = postData.data.item.toString();
            }

            return productId;
        },

        /**
         * @private
         * @param {jQuery} element
         * @returns {string}
         */
        _getProductIcon: function (element) {
            return element.find('svg');
        }
    };
});
