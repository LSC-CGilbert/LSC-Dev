define([
    'Magento_Checkout/js/view/summary/cart-items',
    'Magento_Checkout/js/view/estimation'
], function (cartItems, estimation) {
    'use strict';

    var mixin = {
        getEstimateTotal: function () {
            return estimation().getValue();
        },

        getMaxCartItems: function () {
            return cartItems().maxCartItemsToDisplay;
        },

        getLineCartItems: function () {
            return cartItems().getCartLineItemsCount();
        },

        getSummaryCartItems: function () {
            var resultItems;

            if (typeof cartItems().getCartSummaryItemsCount === 'undefined') {
                resultItems = cartItems().getItemsQty();
            } else {
                resultItems = cartItems().getCartSummaryItemsCount();
            }

            return resultItems;
        }
    };

    return function (Summary) {
        return Summary.extend(mixin);
    };
});
