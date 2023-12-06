/**
 * Quick view Widget
 */

define([
    'underscore',
    'jquery',
    'Magento_Catalog/js/action/am-popup-actions',
    'amAjaxCart',
    'loader',
    'mage/translate',
    'mage/validation'
], function (_, $, amPopupActions, amAjaxCart) {
    'use strict';

    $.widget('am.quickView', {
        options: {
            actionUrl: null,
            toCartUrl: null,
            postData: null,
            loaderContainer: '.product-photo-wrapper'
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
            this.element.unbind('click');
            this.element.on('click', this.sendData.bind(this));
        },

        /**
         * @private
         * @returns {void}
         */
        _initSelectors: function () {
            this.postData = this.element.data('amtheme-post-data');
        },

        /**
         * @param {Event} event
         * @private
         * @returns {void}
         */
        sendData: function (event) {
            var self = this,
                data = self.postData,
                $loaderElement = $(this.element.parents(self.options.loaderContainer));

            event.preventDefault();

            $loaderElement.loader({
                icon: self.options.loaderUrl
            });

            $loaderElement.loader('show');

            $.ajax({
                url: self.options.actionUrl,
                data: data,
                type: 'post',

                success: function (response) {
                    if (!response) {
                        return;
                    }

                    if (response.render_popup && response.popup_html) {
                        amPopupActions.createPopupTemplate(response.popup_html);
                        $('body').trigger('popup.amContentUpdated');
                        self._checkAmAjaxAddtocart();
                        $loaderElement.loader('hide');
                    }
                },

                error: function (response) {
                    if (_.has(response, 'message')) {
                        $loaderElement.loader('hide');
                        amPopupActions.errorResponse(response.message);
                    }
                }
            });
        },

        _checkAmAjaxAddtocart: function () {
            var ajax = amAjaxCart();

            ajax.createPopupSubmitObserve(this.options.toCartUrl);
        }
    });

    return $.am.quickView;
});
