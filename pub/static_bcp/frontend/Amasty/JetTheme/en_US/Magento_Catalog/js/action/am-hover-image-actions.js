/**
 * Ajax actions hover image
 */

/** @api */

define([
    'jquery'
], function ($) {
    'use strict';

    return {
        /**
         * @param {String} actionUrl
         * @param {String} productId
         * @returns {Deferred|null}
         */
        getImages: function (actionUrl, productId) {
            return $.ajax({
                url: actionUrl,
                data: {
                    product_id: productId
                },
                type: 'post',
                dataType: 'json',
                cache: false
            });
        }
    };
});
