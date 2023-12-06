define([
    'jquery'
], function ($) {
    'use strict';

    var shoppingCartMixin = {
        _create: function () {
            this._super();
            $(this.options.emptyCartButton).off('click');
            $(this.options.emptyCartButton).on('click', $.proxy(function () {
                $(this.options.emptyCartButton).attr('name', 'update_cart_action_temp');
                $(this.options.updateCartActionContainer)
                    .attr('name', 'update_cart_action').attr('value', 'empty_cart');

                if ($(this.options.emptyCartButton).parents('form').length > 0) {
                    $(this.options.emptyCartButton).parents('form').trigger('submit');
                }
            }, this));
        }
    };

    return function (shoppingCart) {
        $.widget('mage.shoppingCart', shoppingCart, shoppingCartMixin);

        return $.mage.shoppingCart;
    };
});
