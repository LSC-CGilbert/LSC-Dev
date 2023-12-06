/**
 * Mixin for shipping address form visibility, instead popup view
 */
define([
    'jquery',
    'ko',
    'Magento_Checkout/js/model/form-address-state',
    'Magento_Checkout/js/action/create-shipping-address',
    'Magento_Checkout/js/action/select-shipping-address',
    'Magento_Checkout/js/checkout-data',
    'mage/translate'
], function ($, ko, formState, createShippingAddress, selectShippingAddress, checkoutData) {
    'use strict';

    var baseTitle = $.mage.__('Shipping Address'),
        newTitle = $.mage.__('New shipping address'),
        mixin = {
            isNewAddressVissible: formState.isVisible,

            /*
             * Change shipping form title
             * return {void}
             */
            setAddressTitle: ko.observable(baseTitle),

            /*
             * Show shipping form
             * return {void}
             */
            showNewAddress: function () {
                this.isNewAddressVissible(true);
                this.setAddressTitle(newTitle);
            },

            /*
             * Hide shipping form
             * return {void}
             */
            hideNewAddress: function () {
                this.isNewAddressVissible(false);
                this.setAddressTitle(baseTitle);
            },

            /*
             * Override saveNewAddress method
             * return {void}
             */
            saveNewAddress: function () {
                var addressData,
                    newShippingAddress;

                this.source.set('params.invalid', false);
                this.triggerShippingDataValidateEvent();

                if (!this.source.get('params.invalid')) {
                    addressData = this.source.get('shippingAddress');

                    // if user clicked the checkbox, its value is true or false. Need to convert.
                    addressData['save_in_address_book'] = this.saveInAddressBook ? 1 : 0;

                    // New address must be selected as a shipping address
                    newShippingAddress = createShippingAddress(addressData);
                    selectShippingAddress(newShippingAddress);
                    checkoutData.setSelectedShippingAddress(newShippingAddress.getKey());
                    checkoutData.setNewCustomerShippingAddress($.extend(true, {}, addressData));

                    if (this.isFormPopUpVisible()) {
                        this.getPopUp().closeModal();
                    }

                    this.isNewAddressAdded(true);
                    this.isNewAddressVissible(false);
                }
            }
        };

    return function (Shipping) {
        return Shipping.extend(mixin);
    };
});
