/**
 * Ajax addToWishlist Widget
 */

define([
    'jquery',
    'Magento_Catalog/js/action/am-ajax-actions',
    'mage/cookies',
    'mage/translate',
    'amAjaxCompare'
], function ($, amActions) {
    'use strict';

    $.widget('am.amAjaxWishlist', $.am.amAjaxCompare, {
        options: {
            actionUrl: null,
            customerLoginUrl: '/customer/account/login'
        },

        /**
         * Send data by AJAX
         *
         * @param {Object} formData
         * @private
         * @returns {void}
         */
        _sendData: function (formData) {
            var self = this;

            amActions.sendAddToData(formData, this.options.actionUrl)
                .success(function () {
                    amActions.reloadSection([ 'wishlist' ]);
                })
                .error(function (response) {
                    if (response.status === 401) {
                        $.cookieStorage.set('mage-messages', [
                            {
                                type: 'error',
                                text: $.mage.__(response.responseJSON.message)
                            }
                        ]);

                        window.location.replace(self.options.customerLoginUrl);
                    }
                });
        }
    });

    return $.am.amAjaxWishlist;
});
