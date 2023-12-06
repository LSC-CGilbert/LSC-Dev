/**
 * Ajax actions list
 */

/** @api */

define([
    'jquery',
    'mage/template',
    'Magento_Customer/js/customer-data',
    'mage/cookies',
    'mage/translate'
], function ($, mageTemplate, customerData) {
    'use strict';

    var formKey = $.mage.cookies.get('form_key'),
        formTemplate = '<form action="<%- data.action %>" method="post">'
            + '<% _.each(data, function(value, index) { %>'
            + '<input name="<%- index %>" value="<%- value %>">'
            + '<% }) %></form>';

    return {
        /**
         * Add messages
         *
         * @param {String} message
         * @param {String} type
         * @returns {void}
         */
        addGlobalMsg: function (message, type) {
            customerData.set('messages', {
                messages: [ {
                    type: type || 'error',
                    text: $.mage.__(message)
                } ]
            });
        },

        /**
         * Reload customer section
         *
         * @param {Array} sections
         * @returns {void}
         */
        reloadSection: function (sections) {
            customerData.invalidate(sections);
            customerData.reload(sections, true);
        },

        /**
         * Create ghost form for data sending
         *
         * @param {Object} postData
         * @returns {Object}
         */
        createGhostForm: function (postData) {
            if (formKey) {
                postData['form_key'] = formKey;
            }

            return $(mageTemplate(formTemplate, {
                data: postData
            }));
        },

        /**
         * @param {Object} formData
         * @param {String} actionUrl
         * @returns {Deferred}
         */
        sendAddToData: function (formData, actionUrl) {
            return $.ajax({
                url: actionUrl,
                data: formData,
                type: 'post',
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false
            });
        }
    };
});
