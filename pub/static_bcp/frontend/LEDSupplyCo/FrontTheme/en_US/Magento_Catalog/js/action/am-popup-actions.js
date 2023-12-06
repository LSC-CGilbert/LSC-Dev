/**
 * Ajax popup actions
 *
 *  @api
 */

define([
    'jquery',
    'underscore',
    'mage/template',
    'text!Magento_Catalog/template/product-popup.html',
    'amPopup',
    'matchMedia',
    'mage/validation'
], function ($, _, mageTemplate, amPopupTemplate, amPopup, mediaCheck) {
    'use strict';

    return {
        gallerySelector: '.amtheme-popup-block [data-gallery-role="gallery-placeholder"]',
        customGallerySelector: '.am-gallery-placeholder',
        messageSelector: '[data-amtheme-js="messages"]',
        productFormSelector: '[data-amtheme-js="form"]',
        mediaCheck: '(min-width: 1024px)',
        popupConfig: {
            popupWrapClass: 'amtheme-product-popup',
            popupWrapId: 'amJetConfirmBox',
            closeButtonTitle: $.mage.__('Close')
        },
        appendPopupElement: 'body',
        formIds: {},
        mediaIds: {},
        formLabels: {},

        /**
         * Parse popup content & append at the end of the body
         *
         * @param {String} html
         * @returns {void}
         */
        createPopupTemplate: function (html) {
            var self = this;

            self.popupTemplate = $(mageTemplate(amPopupTemplate, {
                data: {
                    content: html,
                    config: self.popupConfig
                }
            })).appendTo($(self.appendPopupElement));

            this._initPopup();
            this._preparePopupControls();
        },

        /**
         * Initialize amPopup widget
         * @private
         * @returns {void}
         */
        _initPopup: function () {
            this.popup = amPopup({}, this.popupTemplate);
            this.popup.openPopup();
        },

        /**
         * Gather all observers initialization for the form & controls inside the popup window
         * @private
         * @returns {void}
         */
        _preparePopupControls: function () {
            this._handleModalGallery();
            this._createPopupObserve();
        },

        /**
         * Adjust gallery options
         * @private
         * @returns {void}
         */
        _handleModalGallery: function () {
            var galleryConfig = _.has(window, 'gallery') ? window.gallery : {};

            if (_.isEmpty(galleryConfig) || galleryConfig.inUse === 'fotorama') {
                this._handleFotoramaGallery();
            } else {
                this._handleCustomGallery();
            }
        },

        /**
         * Custom gallery handler
         * @return {Object}
         * @private
         */
        _handleCustomGallery: function () {
            return this;
        },

        /**
         * Fotorama gallery handler
         * @private
         * @return {Object}
         */
        _handleFotoramaGallery: function () {
            var self = this;

            $(self.gallerySelector).on('gallery:loaded', function () {
                $(this).on('fotorama:ready fotorama:load', function () {
                    var api = $(this).data('gallery');

                    mediaCheck({
                        media: self.mediaCheck,
                        entry: function () {
                            if (api.fotorama.options.nav === 'thumbs') {
                                api.fotorama.setOptions({
                                    nav: 'dots'
                                });
                            }
                        }
                    });
                });
            });

            return this;
        },

        /**
         * Add listeners to popup DOM element
         * append destroy method after popup close method has been triggered
         *
         * @private
         * @returns {void}
         */
        _createPopupObserve: function () {
            this.popup.element.find('.product-add-form').removeAttr('data-mage-init');
            this.popup.element.find('#product_addtocart_form').trigger('contentUpdated');

            this.popup.element.on('am.popupClosed', function () {
                $('body').trigger('popup.amPopupDestroy');
                this._destroyPopup();
            }.bind(this));
        },

        /**
         * Remove popup instance & remove popup template form DOM
         * @private
         * @returns {void}
         */
        _destroyPopup: function () {
            this.popupTemplate = null;
            this.popup.element.remove();
            this.popup = null;
            this._resetProductFormSelectors();
        },

        /**
         * Error handler
         * @param {String} message
         * @returns {void}
         */
        errorResponse: function (message) {
            if (this.popup && this.popup.isPopupShown) {
                this._updateLocalMsg(message, 'error');
            }
        },

        /**
         * Set local messages block & append messages
         *
         * @param {String} message
         * @param {String} type
         * @private
         * @returns {void}
         */
        _updateLocalMsg: function (message, type) {
            var localMessageBlock = this.popupTemplate.find(this.messageSelector),
                msg = $('<div class="message ' + type + '"><span>' + message + '</span></div>');

            if (!localMessageBlock.length) {
                localMessageBlock = $('<div>', {
                    class: 'messages-list',
                    attr: {
                        'data-amtheme-js': 'messages'
                    }
                });
                localMessageBlock.insertAfter(this.popupTemplate.find('.box-tocart.qty'));
            }

            localMessageBlock.append(msg);
        },

        /**
         * Check popup exist
         * @returns {Boolean}
         */
        isPopupExist: function () {
            return this.popup ? this.popup.isPopupShown : false;
        },

        /**
         * Close popup
         * @returns {void}
         */
        closePopup: function () {
            this.popup.closePopup();
            this._resetProductFormSelectors();
        },

        /**
         * Get product form
         * @private
         * @returns {Object}
         */
        getPopupForm: function () {
            return this.popupTemplate.find(this.productFormSelector);
        },

        /**
         * Get popup template
         * @private
         * @returns {Object}
         */
        getPopupTemplate: function () {
            return this.popupTemplate;
        },

        /**
         * @private
         * @returns {Object}
         */
        _getMediaIds: function () {
            if (!$(this.customGallerySelector).length) {
                return;
            }

            if (this.mediaIds.length) {
                // eslint-disable-next-line consistent-return
                return this.mediaIds;
            }

            this.mediaIds = $(this.customGallerySelector).find('[id]');

            // eslint-disable-next-line consistent-return
            return this.mediaIds;
        },

        /**
         * @private
         * @returns {Object}
         */
        _getProductFormIds: function () {
            if (this.formIds.length) {
                return this.formIds;
            }

            this.formIds = $(this.productFormSelector).find('[id]');

            // eslint-disable-next-line consistent-return
            return this.formIds;
        },

        /**
         * @private
         * @returns {Object}
         */
        _getProductFormLabels: function () {
            if (this.formLabels.length) {
                return this.formLabels;
            }

            this.formLabels = $(this.productFormSelector).find('[for]');

            // eslint-disable-next-line consistent-return
            return this.formLabels;
        },

        /**
         * @private
         * @returns {void}
         */
        _resetProductFormSelectors: function () {
            if (this.formIds.length || this.formLabels.length) {
                this.enableFormIds(this.formIds, this.formLabels, this.mediaIds);
            }
        },

        /**
         * Need to disable IDs on Product pages for correct form validation in popup
         * @returns {void}
         */
        disableFormIds: function () {
            var mediaIds;

            if ($(this.productFormSelector).length) {
                this._getProductFormIds().each(function () {
                    $(this).attr('id', 'disabled-' + $(this).attr('id'));
                });
                this._getProductFormLabels().each(function () {
                    $(this).attr('for', 'disabled-' + $(this).attr('for'));
                });

                mediaIds = this._getMediaIds();

                if (!_.isEmpty(mediaIds)) {
                    mediaIds.each(function () {
                        $(this).attr('id', 'disabled-' + $(this).attr('id'));
                    });
                }
            }
        },

        /**
         *
         * @param {Object} formIds
         * @param {Object} formLabels
         * @param {Object} mediaIds
         * @private
         * @returns {void}
         */
        enableFormIds: function (formIds, formLabels, mediaIds) {
            if ($(this.productFormSelector).length) {
                formIds.each(function () {
                    $(this).attr('id', $(this).attr('id').split('disabled-')[1]);
                });
                formLabels.each(function () {
                    $(this).attr('for', $(this).attr('for').split('disabled-')[1]);
                });

                if (!_.isEmpty(mediaIds)) {
                    mediaIds.each(function () {
                        $(this).attr('id', $(this).attr('id').split('disabled-')[1]);
                    });
                }
            }
        }
    };
});
