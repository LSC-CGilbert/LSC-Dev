/**
 * Ajax addToCart Widget
 */

define([
    'underscore',
    'jquery',
    'Magento_Catalog/js/action/am-ajax-actions',
    'Magento_Catalog/js/action/am-popup-actions',
    'mage/url',
    'matchMedia',
    'mage/translate',
    'mage/validation'
], function (_, $, amActions, amPopupActions, urlBuilder) {
    'use strict';

    $.widget('am.addToCart', {
        options: {
            actionUrl: null,
            scrollToTopAfterSubmit: false,
            scrollAnimationSpeed: '250',
            addToCartButtonText: {
                adding: $.mage.__('Adding...'),
                added: $.mage.__('Added'),
                default: $.mage.__('Add to Cart')
            },
            classes: {
                addToCartButtonDisable: 'disabled',
                showSpinnerClass: '-show-spinner',
                addedToCartState: '-adding-complete'
            },
            selectors: {
                popupSelector: '.amtheme-popup-block',
                addToCartButton: '.action.tocart',
                minicartSelector: '[data-block="minicart"]',
                messagesSelector: '[data-amtheme-js="messages"]',
                qtySelector: '[data-amtheme-js="qty-input"]',
                productFormSelector: '#product_addtocart_form',
                updatableFormAttribute: 'am-data-update',
                giftRegistryFormAttribute: 'am-data-registry',
                selectAllOptionsSelector: 'links_all'
            },
            gallery: {
                galleryPlaceholder: '[data-gallery-role=gallery-placeholder]',
                popupGallerySelector: '.amtheme-popup-block [data-gallery-role=gallery-placeholder]'
            },
            closePopupDelay: 1000,
            saveAddedStateDelay: 2500
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
            if (this.element.data('post')) {
                this.dataPostElement = this.element;
                this.actionButton = this.element;
                this.element.on('click', this.handleDataPost.bind(this));
            } else {
                this.element.on('submit', this.submitForm.bind(this, this.element));
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _initSelectors: function () {
            this.minicartSelector = $(this.options.selectors.minicartSelector);
        },

        /**
         * @param {Event} event
         * @returns {void}
         */
        handleDataPost: function (event) {
            var dataPost = this.dataPostElement.data('post'),
                data = this._normalizeDataPost(dataPost.data),
                form = amActions.createGhostForm(data);

            event.preventDefault();
            event.stopImmediatePropagation();

            if (!form) {
                return;
            }

            this.element.blur();
            this._submitForm(form);
        },

        /**
         * Adjust post data
         *
         * @param {Object} postData
         * @private
         * @returns {Object}
         */
        _normalizeDataPost: function (postData) {
            var parentElement = this.dataPostElement.closest('.product-item-info'),
                qtyValue = parentElement.find(this.options.selectors.qtySelector).val(),
                data;

            if (postData) {
                data = $.extend({}, postData, {
                    qty: qtyValue,
                    product: this.dataPostElement.data('product-id')
                });
            }

            return data;
        },

        /**
         * @param {Element} form
         * @param {Event} e
         * @param {String} url
         * @returns {void}
         */
        submitForm: function (form, e, url) {
            e.preventDefault();

            this.element.find(this.options.selectors.addToCartButton).blur();
            this._submitForm(form, url);
        },

        /**
         * Submit form by AJAX
         *
         * @param {Element} form
         * @param {String} url
         * @private
         * @returns {void}
         */
        _submitForm: function (form, url) {
            var self = this,
                formData = new FormData(form ? form[0] : this.element[0]),
                updateProduct = form.attr(this.options.selectors.updatableFormAttribute),
                giftRegProduct = form.attr(this.options.selectors.giftRegistryFormAttribute),
                ajaxUrl = url || this.options.actionUrl,
                isToCartReload = false;

            if (amPopupActions.isPopupExist()) {
                formData.append('is_modal_show', '1');
            }

            if (updateProduct || giftRegProduct) {
                ajaxUrl = form.attr('action');
                isToCartReload = true;
            }

            $.ajax({
                url: ajaxUrl,
                data: formData,
                type: 'post',
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,

                beforeSend: function () {
                    self.disableAddToCartButton(form);
                },

                success: function (response) {
                    if (!response) {
                        return;
                    }

                    self.enableAddToCartButton(form);

                    if (response.popup_html) {
                        // eslint-disable-next-line vars-on-top
                        var gallery = self.options.gallery,
                            selectors = self.options.selectors;

                        response.popup_html = response.popup_html
                            .replaceAll(gallery.galleryPlaceholder, gallery.popupGallerySelector)
                            // eslint-disable-next-line max-len
                            .replaceAll(selectors.selectAllOptionsSelector, 'popup-' + selectors.selectAllOptionsSelector)
                            // eslint-disable-next-line max-len
                            .replaceAll(selectors.productFormSelector, selectors.popupSelector + ' ' + selectors.productFormSelector);
                    }

                    if (response.render_popup && response.popup_html) {
                        amPopupActions.disableFormIds();
                        amPopupActions.createPopupTemplate(response.popup_html);
                        $('body').trigger('popup.amContentUpdated');
                        self.createPopupSubmitObserve();
                    }

                    if (!response.render_popup) {
                        self.minicartSelector.trigger('contentLoading');

                        if (amPopupActions.isPopupExist()) {
                            _.delay(function () {
                                amPopupActions.closePopup();
                            }, self.options.closePopupDelay);
                        }

                        amActions.reloadSection([ 'cart' ]);
                        self.afterMiniCartUpdatedAction();
                    }
                },

                error: function (response) {
                    if (_.has(response.responseJSON, 'message')) {
                        amPopupActions.errorResponse(response.responseJSON.message);
                    }

                    self.resetAddToCartButtonState(form);
                },

                complete: function () {
                    if (isToCartReload) {
                        if (amPopupActions.isPopupExist()) {
                            _.delay(function () {
                                amPopupActions.closePopup();
                            }, self.options.closePopupDelay);
                        }

                        if (updateProduct) {
                            window.location.href = urlBuilder.build('checkout/cart/');
                        }

                        if (giftRegProduct) {
                            window.location.href = urlBuilder.build('giftregistry/');
                        }
                    }

                    self._scrollAnimation();
                }
            });
        },

        /**
         * @private
         * @returns {Object}
         */
        _scrollAnimation: function () {
            if (this.options.scrollToTopAfterSubmit) {
                $('html, body').animate({ scrollTop: 0 }, this.options.scrollAnimationSpeed);
            }

            return this;
        },

        /**
         * Add submit handler to the form inside the popup
         * @param {String} toCartUrl
         * @returns {void}
         */
        createPopupSubmitObserve: function (toCartUrl) {
            var self = this,
                form = amPopupActions.getPopupForm(),
                url = toCartUrl;

            if (form.length) {
                form.on('submit', function (e) {
                    var $this = $(this),
                        validator = $this.validation();

                    e.preventDefault();
                    e.stopImmediatePropagation();

                    self._resetLocalMsg();

                    if (validator.valid()) {
                        self.submitForm($this, e, url);
                    }
                });
            }
        },

        /**
         * Reset local messages block
         * @private
         * @returns {void}
         */
        _resetLocalMsg: function () {
            var popupTemplate = amPopupActions.getPopupTemplate(),
                localMessageBlock = popupTemplate.find(this.options.selectors.messagesSelector);

            if (localMessageBlock.length) {
                localMessageBlock.html('');
            }
        },

        /**
         * Add disable classes from addToCart button
         *
         * @param {Element} form
         * @returns {void}
         */
        disableAddToCartButton: function (form) {
            var addToCartButtonTextWhileAdding = this.options.addToCartButtonText.adding,
                buttonElement = this._getActionButton(form),
                buttonText = buttonElement.find('span').length
                    ? buttonElement.find('span') : buttonElement;

            buttonElement
                .addClass(this.options.classes.addToCartButtonDisable)
                .addClass(this.options.classes.showSpinnerClass);
            buttonElement.attr('title', addToCartButtonTextWhileAdding);
            buttonText.text(addToCartButtonTextWhileAdding);
        },

        /**
         * Remove disable classes from addToCart button
         *
         * @param {Element} form
         * @returns {void}
         */
        enableAddToCartButton: function (form) {
            var addToCartButtonTextAdded = this.options.addToCartButtonText.added,
                buttonElement = this._getActionButton(form),
                buttonText = buttonElement.find('span').length
                    ? buttonElement.find('span') : buttonElement;

            buttonElement
                .addClass(this.options.classes.addedToCartState)
                .removeClass(this.options.classes.addToCartButtonDisable);
            buttonElement.attr('title', addToCartButtonTextAdded);
            buttonText.text(addToCartButtonTextAdded);

            setTimeout(function () {
                this.resetAddToCartButtonState(form);
            }.bind(this), this.options.saveAddedStateDelay);
        },

        /**
         * Reset addToCart button to default state
         *
         * @param {Element} form
         * @returns {void}
         */
        resetAddToCartButtonState: function (form) {
            var addToCartButtonTextDefault = this.options.addToCartButtonText.default,
                buttonElement = this._getActionButton(form),
                buttonText = buttonElement.find('span').length ? buttonElement.find('span') : buttonElement;

            buttonElement
                .removeClass(this.options.classes.showSpinnerClass)
                .removeClass(this.options.classes.addedToCartState);
            buttonElement.attr('title', addToCartButtonTextDefault);
            buttonText.text(addToCartButtonTextDefault);
        },

        /**
         * Get addToCart button
         *
         * @param {Element} form
         * @private
         * @returns {Element}
         */
        _getActionButton: function (form) {
            return form.find(this.options.selectors.addToCartButton).length
                ? form.find(this.options.selectors.addToCartButton)
                : this.actionButton;
        },

        /**
         * Empty function for mixins
         *
         * @returns {Object}
         */
        afterMiniCartUpdatedAction: function () {
            return this;
        }
    });

    return $.am.addToCart;
});
