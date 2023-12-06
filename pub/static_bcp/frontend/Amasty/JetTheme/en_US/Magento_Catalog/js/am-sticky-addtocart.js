/**
 * Widget for product sticky add to cart
 */

define([
    'underscore',
    'jquery',
    'mage/translate',
    'mage/validation',
    'Magento_Catalog/js/am-ajax-cart'
], function (_, $) {
    'use strict';

    $.widget('am.stickyAddToCart', {
        options: {
            classes: {
                stickyPrefix: 'sticky-',
                active: '-amsticky-cart-active',
                configured: 'configurable-cart',
                stickyCartBlock: 'amsticky-cart-block',
                stickyProductName: 'amsticky-product-name'
            },
            selectors: {
                activePopupSelector: '.amtheme-product-popup.-amtheme-active',
                bundleProductsSelector: '.bundle-options-wrapper',
                giftRegistryProductSelector: '.giftregisty',
                groupedProductsSelector: '.table-wrapper.grouped',
                configurableProductsSelector: '.product-options-wrapper',
                updatableProductSelector: '.box-tocart.update',
                formBottomSelector: '.amsticky-cart-block .amtheme-add-form-bottom',
                addToCartSelector: '[data-amtheme-js="addtocart-button"]',
                addToCartButtonTitle: '.amtheme-title',
                productForm: '[data-amtheme-js="form"]',
                productInfoBlock: '.amtheme-product-info',
                productStickyParent: '.product-info-main',
                productNameSource: '[data-ui-id="page-title-wrapper"][itemprop="name"]'
            },
            ajaxConfig: {
                classes: {
                    addToCartButtonDisable: 'disabled'
                },
                addToCartButtonText: {
                    default: $.mage.__('Buy')
                },
                delay: 500,
                scrollToTopAfterSubmit: true,
                scrollAnimationSpeed: '250'
            },
            formReplacementIds: [
                '#product-addtocart-button',
                '#qty',
                '#related-products-field',
                '#product-updatecart-button'
            ],
            prices: {
                dataPriceBoxSelector: '[data-role="priceBox"]'
            },
            ajaxAddToCartUrl: null,
            isAjaxEnabled: false,
            addToCartText: $.mage.__('Buy'),
            updateToCartText: $.mage.__('Update Cart'),
            giftRegistryToCartText: $.mage.__('Add to Gift Registry'),
            setNameToElement: '.product-info-price',
            stickyPriceBlock: '.price-as-configured',
            customHtml: null
        },

        /**
         * @private
         * @returns {void}
         */
        _create: function () {
            if ($(this.options.selectors.productInfoBlock).length) {
                this._initSelectors();
                this._createStickyBlock();

                if (this.options.isAjaxEnabled) {
                    this._initAjaxListeners();
                }

                this._initListeners();
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _initSelectors: function () {
            var selectors = this.options.selectors;

            this.body = $('body');
            this.formBottom = selectors.formBottomSelector;
            this.bundleProducts = selectors.bundleProductsSelector;
            this.configurableProducts = selectors.configurableProductsSelector;
            this.updatebleProduct = selectors.updatableProductSelector;
            this.giftRegistryProduct = selectors.giftRegistryProductSelector;
            this.groupedProducts = selectors.groupedProductsSelector;
            this.productNameSourceBlock = $(selectors.productNameSource);
            this.productStickyParent = $(selectors.productStickyParent);
            this.productFormBlock = $(selectors.productForm);
        },

        /**
         * @private
         * @returns {void}
         */
        _createStickyBlock: function () {
            this.html = this._changeFormBlockHtml();
            this.stickyCartBlock = $('<div>', { class: this.options.classes.stickyCartBlock });
            this.stickyCartBlock.appendTo(this.element).hide();
            this.html.appendTo(this.stickyCartBlock);
            this._setProductName();
            this._insertCustomHtml();
            this._stickBlock();
        },

        /**
         * @param {HTML} [element]
         * @private
         * @returns {void}
         */
        _disableStickyPriceChange: function (element) {
            $(element).find(this.options.prices.dataPriceBoxSelector).removeAttr('data-role');
        },

        /**
         * Fix the same id's
         * @private
         * @returns {Object} Html
         */
        _changeFormBlockHtml: function () {
            var initialBlock = this.productFormBlock.clone(),
                prefix = this.options.classes.stickyPrefix,
                bundle = initialBlock.find(this.bundleProducts),
                configurable = initialBlock.find(this.configurableProducts),
                grouped = initialBlock.find(this.groupedProducts);

            $.each(this.options.formReplacementIds, function (i, val) {
                initialBlock.find(val).attr('id', prefix + val.split('#')[1]);
            });

            initialBlock
                .attr('id', prefix + initialBlock[0].id)
                .find(this.options.selectors.addToCartSelector)
                .attr('data-title', this.options.addToCartText)
                .find(this.options.selectors.addToCartButtonTitle)
                .text(this.options.addToCartText);

            if (bundle.length) {
                bundle.remove();
            }

            if (configurable.length) {
                configurable.remove();
                initialBlock
                    .find(this.options.selectors.addToCartSelector)
                    .addClass(this.options.classes.configured);
            }

            if (grouped.length) {
                grouped.remove();
                initialBlock.find(this.options.setNameToElement).show();
            }

            return initialBlock;
        },

        /**
         * @private
         * @returns {void}
         */
        _initListeners: function () {
            this.window.on('scroll.amStickyProductCart', this._stickBlock.bind(this));
            this.addToCartButton = this.stickyCartBlock.find(this.options.selectors.addToCartSelector);
            // eslint-disable-next-line no-unused-expressions
            this.options.isAjaxEnabled ? this._setAjaxAction(this.html) : this._setScrollTopAction();
        },

        /**
         * @param {HTML} [form]
         * @private
         * @returns {void}
         */
        _setAjaxAction: function (form) {
            $(form).addToCart($.extend(this.options.ajaxConfig, {
                'actionUrl': this.options.ajaxAddToCartUrl
            }));
        },

        /**
         * @private
         * @returns {void}
         */
        _setScrollTopAction: function () {
            var self = this;

            this.addToCartButton.on('click', function (event) {
                event.preventDefault();

                if (self.productFormBlock.validation('isValid')) {
                    if (!$(self.updatebleProduct).length) {
                        self.productFormBlock.submit();
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
            $('html, body').animate({ scrollTop: 0 }, this.options.ajaxConfig.scrollAnimationSpeed);

            return this;
        },

        /**
         * @private
         * @returns {void}
         */
        _stickBlock: function () {
            var windowTop = this.window.scrollTop(),
                activeClass = this.options.classes.active,
                bottomToShow = Math.round(this.productStickyParent.offset().top
                    + this.productStickyParent.outerHeight());

            if (windowTop > bottomToShow) {
                this.body.addClass(activeClass);
                this.stickyCartBlock.addClass(activeClass).show();
            } else {
                this.body.removeClass(activeClass);
                this.stickyCartBlock.removeClass(activeClass).hide();
            }
        },

        /**
         * Set product name to the caret
         * @private
         * @returns {void}
         */
        _setProductName: function () {
            var productName = this._getProductName(),
                setToElement = this.stickyCartBlock.find(this.options.setNameToElement),
                bundleSetToElementContainer = this.stickyCartBlock.find(this.options.stickyPriceBlock);

            setToElement = setToElement.length ? setToElement : bundleSetToElementContainer;
            this.productNameBlock = $('<div>', { class: this.options.classes.stickyProductName }).html(productName);

            // eslint-disable-next-line no-unused-expressions
            setToElement.length ? this.productNameBlock.prependTo(setToElement)
                : this.productNameBlock.prependTo($(this.formBottom));
        },

        /**
         * Insert custom button HTML
         * @private
         * @returns {void}
         */
        _insertCustomHtml: function () {
            var productBlock = this.stickyCartBlock.find(this.options.selectors.productForm);

            if (this.options.customHtml && productBlock.length) {
                $(this.options.customHtml).appendTo(productBlock);
            }

            productBlock.trigger('contentUpdated');
        },

        /**
         * Get product name
         * @private
         * @returns {String}
         */
        _getProductName: function () {
            return this.productNameSourceBlock.html();
        },

        /**
         * If AjaxPopup is used for update or
         * adding product to the giftregistry  product - need to replace addtocart button
         * @private
         * @param {string} type
         * @returns {void}
         */
        _replacePopupAction: function (type) {
            var self = this,
                attribute,
                buttonText;

            // eslint-disable-next-line default-case
            switch (type) {
                case 'update':
                    attribute = 'am-data-update';
                    buttonText = self.options.updateToCartText;
                    break;
                case 'registry':
                    attribute = 'am-data-registry';
                    buttonText = self.options.giftRegistryToCartText;
                    break;
            }

            self.body.on('popup.amContentUpdated', function () {
                $(self.options.selectors.activePopupSelector)
                    .find(self.options.selectors.productForm)
                    .attr(attribute, true)
                    .attr('action', $(self.options.selectors.productForm)[0].action)
                    .find(self.options.selectors.addToCartSelector + ' ' + self.options.selectors.addToCartButtonTitle)
                    .text(buttonText);
            });
        },

        /**
         * @private
         * @returns {void}
         */
        _initAjaxListeners: function () {
            var self = this;

            this._disableStickyPriceChange(this.html);

            if ($(this.updatebleProduct).length) {
                this.options.ajaxConfig.addToCartButtonText.default = this.options.updateToCartText;
                this._replacePopupAction('update');
            }

            if ($(this.giftRegistryProduct).length) {
                this.options.ajaxConfig.addToCartButtonText.default = this.options.giftRegistryToCartText;
                this._replacePopupAction('registry');
            }

            this.body.on('popup.amContentUpdated', function () {
                $(self.options.selectors.activePopupSelector).find('input[id]').each(function () {
                    if ($(this).attr('id').indexOf('popup-') < 0) {
                        $(this).attr('id', 'popup-' + $(this).attr('id'));
                    }
                });

                $(self.options.selectors.activePopupSelector).find('label[for]').each(function () {
                    if ($(this).attr('for').indexOf('popup-') < 0) {
                        $(this).attr('for', 'popup-' + $(this).attr('for'));
                    }
                });

                if ($(self.options.selectors.activePopupSelector).length) {
                    $(self.options.selectors.activePopupSelector)
                        .find('#links-advice-container')
                        .attr('id', 'popup-links-advice-container');
                }
            });
        }
    });

    return $.am.stickyAddToCart;
});
