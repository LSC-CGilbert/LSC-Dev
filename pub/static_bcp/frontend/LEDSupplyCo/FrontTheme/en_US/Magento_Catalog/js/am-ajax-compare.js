/**
 * Ajax addToCompare Widget
 */

define([
    'jquery',
    'Magento_Catalog/js/action/am-ajax-actions'
], function ($, amActions) {
    'use strict';

    $.widget('am.amAjaxCompare', {
        options: {
            actionUrl: null,
            postData: null
        },

        /**
         * Widget initialization
         * @private
         * @returns {void}
         */
        _create: function () {
            this._initSelectors();
            this._initListeners();
        },

        /**
         * @private
         * @returns {void}
         */
        _initListeners: function () {
            this.element.on('click', this.sendData.bind(this));
        },

        /**
         * @private
         * @returns {void}
         */
        _initSelectors: function () {
            this.postData = this.element.data('post');
        },

        /**
         * @param {Event} event
         * @private
         * @returns {void}
         */
        sendData: function (event) {
            var formData = new FormData(amActions.createGhostForm(this.postData.data)[0]);

            event.preventDefault();
            event.stopImmediatePropagation();

            if (!formData) {
                return;
            }

            this._sendData(formData);
        },

        /**
         * Send data by AJAX
         *
         * @param {Object} formData
         * @private
         * @returns {void}
         */
        _sendData: function (formData) {
            amActions.sendAddToData(formData, this.options.actionUrl)
                .success(function () {
                    amActions.reloadSection([ 'compare-products' ]);
                });
        }
    });

    return $.am.amAjaxCompare;
});
