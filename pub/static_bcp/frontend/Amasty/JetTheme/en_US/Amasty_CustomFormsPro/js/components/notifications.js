/**
 * Notifications Component
 */

define([
    'jquery',
    'amcformMessageList'
], function ($, messageList) {
    'use strict';

    $.widget('mage.amcformNotifications', {
        options: {},

        /**
         * @inheritDoc
         * @private
         */
        _create: function () {
            this.showSuccessMessage();
        },

        /**
         * @public
         * @return {void}
         */
        showSuccessMessage: function () {
            if (this.getMessageType('edited')) {
                this.successMessage('Thank you for updating the form submission.');
                this.setMessageType('edited', 0);
            }

            if (this.getMessageType('removed')) {
                this.successMessage('Submission has been removed.');
                this.setMessageType('removed', 0);
            }
        },

        /**
         * @param {string} type
         * @public
         * @return {number}
         */
        getMessageType: function (type) {
            return Number(window.sessionStorage['amcform_notifications_' + type]);
        },

        /**
         * @param {string} type
         * @param {number} value - 1 or 0
         * @public
         * @return {void}
         */
        setMessageType: function (type, value) {
            window.sessionStorage['amcform_notifications_' + type] = value;
        },

        /**
         * @param {string} message
         * @public
         * @return {void}
         */
        successMessage: function (message) {
            if (messageList) {
                messageList.addSuccessMessage({ message: $.mage.__(message) });
            }
        }
    });

    return $.mage.amcformNotifications;
});
