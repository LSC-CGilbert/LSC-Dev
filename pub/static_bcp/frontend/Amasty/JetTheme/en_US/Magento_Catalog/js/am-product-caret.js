define([
    'underscore',
    'jquery',
    'matchMedia',
    'mage/validation'
], function (_, $, mediaCheck) {
    'use strict';

    $.widget('am.productCaret', {
        options: {
            mediaBreakpoint: '(min-width: 1024px)',
            classes: {
                caretProductName: 'amcaret-product-name',
                active: '-amcaret-active',
                stick: '-amcaret-stick',
                enabled: '-amcaret-enabled'
            },
            selectors: {
                productNameSource: '[data-ui-id="page-title-wrapper"][itemprop="name"]',
                productCaretParent: '.product-info-main',
                whereToStick: {
                    top: '.amtheme-productinfo-wrap',
                    bottom: '.columns',
                    left: '.amtheme-productaside-wrap'
                },
                productInfoBlock: '.amtheme-product-info',
                bundleShow: '#bundle-slide',
                bundleHide: '.fieldset-bundle-options .customization',
                subscribeOption: '[data-amrec-js="purchase-type"]',
                collapsible: '[data-amcollapsible="block"]',
                productForm: '[data-amtheme-js="form"]',
                addToCart: '[data-amtheme-js="addtocart-button"]',
                slickSlider: '.slick-slider'
            },
            caretMargin: 30
        },

        /**
         * @private
         * @returns {void}
         */
        _create: function () {
            if ($(this.options.selectors.productInfoBlock).length) {
                this._initNodes();
                this._initSelectors();
                this._initCaret();
                this._setProductName();
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _initNodes: function () {
            this.productNameBlock = $('<div>', { class: this.options.classes.caretProductName });
        },

        /**
         * @private
         * @returns {void}
         */
        _initSelectors: function () {
            var selectors = this.options.selectors;

            this.window = $(window);
            this.body = $('body');
            this.productCaretParent = $(selectors.productCaretParent);
            this.productNameSourceBlock = $(selectors.productNameSource);
            this.whereToStickBlockTop = $(selectors.whereToStick.top);
            this.whereToStickBlockBottom = $(selectors.whereToStick.bottom);
            this.whereToStickBlockLeft = $(selectors.whereToStick.left);
            this.productInfoBlock = document.querySelector(selectors.productInfoBlock);
            this.collapsibleBlock = this.element.find(selectors.collapsible);
            this.buttonBundleShow = $(selectors.bundleShow);
            this.buttonBundleHide = $(selectors.bundleHide);
            this.subscribeOption = $(selectors.subscribeOption);
            this.productFormBlock = $(selectors.productForm);
            this.addToCartButton = $(selectors.addToCart);
        },

        /**
         * Check if product has swatches and call the observer to watch them load
         * @private
         * @returns {void}
         */
        _initCaret: function () {
            this.body.addClass(this.options.classes.enabled);
            this._initObserver();
            this._initResponsive();

            if ($(this.options.selectors.slickSlider).length) {
                this._recalculateSlider();
            }
        },

        /**
         * Recalculate slick slider width when caret is initiated
         * @private
         * @returns {void}
         */
        _recalculateSlider: function () {
            this.body.on('transitionend.amSlider', function () {
                $(this.options.selectors.slickSlider).slick('setPosition');
                $(this).off('transitionend.amSlider');
            }.bind(this));
        },

        /**
         * @param {Boolean} [isInit]
         * @private
         * @returns {void}
         */
        _initListeners: function (isInit) {
            var self = this;

            if (isInit) {
                this.window.on('scroll.amStick', this._stickBlock.bind(this));
                this.window.on('resize.amStick', _.debounce(this._stickBlock.bind(this), 300));
            } else {
                this.window.off('scroll.amStick');
                this.window.off('resize.amStick');
            }

            if (isInit && this.buttonBundleShow) {
                this.buttonBundleShow.on('click', this._setBlockHeight.bind(this, this.element.outerHeight()));
                this.buttonBundleHide.on('click', this._setBlockHeight.bind(this, 'inherit'));
            }

            if (isInit && this.subscribeOption) {
                this.subscribeOption.on('click', this._setBlockHeight.bind(this, 'inherit'));
            }

            if (isInit && this.collapsibleBlock.length) {
                this.window.on('scroll.amCaretOn', this._collapsibleBlockCollapse.bind(this));

                this.addToCartButton.on('click', function () {
                    if (!self.productFormBlock.validation('isValid')) {
                        self.collapsibleBlock.collapsible('forceActivate');
                    }
                });
            } else {
                this.window.off('scroll.amCaretOn scroll.amCaretOff');
            }

            if (!isInit && this.collapsibleBlock.length && this.collapsibleBlock.collapsibleExtend) {
                this.collapsibleBlock.collapsibleExtend('disableCollapsible');
                this.collapsibleBlock.collapsible('forceActivate');
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _initResponsive: function () {
            var self = this;

            mediaCheck({
                media: self.options.mediaBreakpoint,
                entry: function () {
                    self._initListeners(true);
                    self._setBlockHeight();
                },
                exit: function () {
                    self._initListeners(false);
                    self._clearStickBlock();
                }
            });
        },

        /**
         * Calculate properties for product caret
         * @private
         * @returns {Object}
         */
        _calculateProperties: function () {
            var caretMargin = this.options.caretMargin,
                windowTop = this.window.scrollTop(),
                layoutOffset = this.whereToStickBlockLeft[0].offsetParent.offsetLeft,
                topToStick = Math.round(this.whereToStickBlockTop.offset().top),
                fromLeftOffset = this.whereToStickBlockLeft.offset().left - layoutOffset,
                fromLeft = this.whereToStickBlockLeft.innerWidth() + layoutOffset;

            return {
                caretMargin: caretMargin,
                caretWidth: this.whereToStickBlockTop.innerWidth(),
                windowTop: windowTop,
                windowBottom: windowTop + this.element.outerHeight() + (caretMargin * 2),
                layoutOffset: layoutOffset,
                topToStick: topToStick,
                bottomToStick: this.whereToStickBlockBottom.offset().top + this.whereToStickBlockBottom.outerHeight(),
                fromTop: this.whereToStickBlockTop[0].offsetTop + caretMargin,
                fromLeftOffset: fromLeftOffset,
                fromLeft: fromLeft,
                bottomToShow: Math.round(this.productCaretParent.offset().top + this.productCaretParent.outerHeight()),
                leftWithOffset: fromLeft + fromLeftOffset
            };
        },

        /**
         * Collapse collapsible elements inside caret and enable collapsible functionality
         * @private
         * @returns {void}
         */
        _collapsibleBlockCollapse: function () {
            var prop = this._calculateProperties();

            if (prop.windowTop > prop.bottomToShow) {
                this.collapsibleBlock.collapsibleExtend('enableCollapsible');
                this.collapsibleBlock.collapsible('forceDeactivate');

                this.window.off('scroll.amCaretOn');
                this.window.on('scroll.amCaretOff', this._collapsibleBlockExpand.bind(this));
            }
        },

        /**
         * Expand collapsible elements inside caret and disable collapsible functionality
         * @private
         * @returns {void}
         */
        _collapsibleBlockExpand: function () {
            var prop = this._calculateProperties();

            if (prop.windowTop < prop.bottomToShow) {
                this.collapsibleBlock.collapsibleExtend('disableCollapsible');
                this.collapsibleBlock.collapsible('forceActivate');

                this.window.off('scroll.amCaretOff');
                this.window.on('scroll.amCaretOn', this._collapsibleBlockCollapse.bind(this));
            }
        },

        /**
         * Check for offset of the whereToStick block and stick the caret
         * @private
         * @returns {void}
         */
        _stickBlock: function () {
            var prop = this._calculateProperties(),
                maxCaretHeight = this.window.innerHeight() > this.whereToStickBlockTop.height()
                    ? this.whereToStickBlockTop.height() : 'calc(100vh - ' + this.options.caretMargin * 2 + 'px)';

            if (prop.windowTop > prop.bottomToShow) {
                this.element.addClass(this.options.classes.active);
                this._setPosition(this.element, prop.fromTop, false, prop.fromLeft, prop.caretWidth);
                this.element.css('maxHeight', maxCaretHeight);
            } else {
                this.element.removeClass(this.options.classes.active);
                this._setPosition(this.element);
                this._setBlockHeight();
                this.element.css('maxHeight', 'inherit');
            }

            this.element.toggleClass(this.options.classes.stick, prop.windowTop > prop.topToStick);

            if (prop.windowTop > prop.topToStick) {
                this._setPosition(this.element, prop.caretMargin, false, prop.leftWithOffset, prop.caretWidth);
            }

            if (prop.windowTop > prop.topToStick && prop.windowBottom > prop.bottomToStick) {
                this.element.removeClass(this.options.classes.stick);
                this._setPosition(this.element, false, prop.caretMargin, prop.fromLeft, prop.caretWidth);
            } else if (prop.windowTop > prop.topToStick) {
                this._setPosition(this.element, prop.caretMargin, false, prop.leftWithOffset, prop.caretWidth);
            }
        },

        /**
         * Init mutation observer to watch for the root element changing
         * @private
         * @returns {void}
         */
        _initObserver: function () {
            var self = this,
                observeTarget = document.querySelector(self.options.selectors.productCaretParent),
                mutationOptions = { attributes: false, childList: true, subtree: true };

            this.observer = new MutationObserver(function (mutationsList) {
                mutationsList.forEach(function () {
                    if (!self.element.hasClass(self.options.classes.active)) {
                        self._setBlockHeight();
                    }
                });
            });

            this.observer.observe(observeTarget, mutationOptions);
        },

        /**
         * Set position to caret. Set to initial if pass no values;
         * @param {Object} [element]
         * @param {Number | String | Boolean} [top]
         * @param {Number | String | Boolean} [bottom]
         * @param {Number | String | Boolean} [left]
         * @param {Number | String | Boolean} [width]
         * @private
         * @returns {void}
         */
        _setPosition: function (element, top, bottom, left, width) {
            element.css({
                'top': top || 'inherit',
                'bottom': bottom || 'inherit',
                'left': left || 'inherit',
                'width': width ? width / 3 : 'auto'
            });
        },

        /**
         * Set product name to the caret
         * @param {Number | String | Boolean} [value]
         * @private
         * @returns {void}
         */
        _setBlockHeight: function (value) {
            var caretHeight = this.element[0].offsetHeight,
                parentHeight = this.productCaretParent.outerHeight();

            this.resultHeight = caretHeight < parentHeight ? parentHeight : caretHeight;

            this.productCaretParent.css({
                'minHeight': value || this.resultHeight
            });
        },

        /**
         * Set product name to the caret
         * @private
         * @returns {void}
         */
        _setProductName: function () {
            this.productNameBlock.html(this._getProductName()).prependTo(this.element);
        },

        /**
         * Get product name
         * @private
         * @returns {String}
         */
        _getProductName: function () {
            return $(this.productNameSourceBlock).html();
        },

        /**
         * Remove init classes from the caret
         * @private
         * @returns {void}
         */
        _clearStickBlock: function () {
            this.element.removeClass(this.options.classes.active);
            this.element.removeClass(this.options.classes.stick);
            this._setPosition(this.element);
            this._setBlockHeight('inherit');
            this.element.css('maxHeight', 'inherit');
        }
    });

    return $.am.productCaret;
});
