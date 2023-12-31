define([
    'mage/storage',
    'Magento_Checkout/js/model/url-builder'
], function (storage, urlBuilder) {
    'use strict';

    return function (deferred, email) {
        return storage.get(
            urlBuilder.createUrl('/amasty_quote/isEmailAvailable/:customerEmail', {customerEmail: email}),
            false
        ).done(function (isEmailAvailable) {
            if (isEmailAvailable) {
                deferred.resolve();
            } else {
                deferred.reject();
            }
        }).fail(function () {
            deferred.reject();
        });
    };
});
