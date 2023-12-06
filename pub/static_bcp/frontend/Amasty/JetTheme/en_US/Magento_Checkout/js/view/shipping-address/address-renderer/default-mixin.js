/**
 * Mixin for shipping address form visibility, instead popup view
 */
define([
    'underscore',
    'Magento_Checkout/js/model/form-address-state'
], function (_, formState) {
    'use strict';

    var mixin = {
        isEditVisible: formState.isVisible,

        /*
         * Trigger form visibility
         * return {void}
         */
        editNewAddress: function () {
            if (_.has(window, 'amasty_checkout_disabled') && window.amasty_checkout_disabled) {
                formState.isVisible(true);
            } else {
                this.editAddress();
            }
        }
    };

    return function (AddressRenderer) {
        return AddressRenderer.extend(mixin);
    };
});
