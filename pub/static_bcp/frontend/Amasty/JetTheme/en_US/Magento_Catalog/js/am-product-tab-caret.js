define([
    'jquery',
    'matchMedia',
    'tabs'
], function ($, mediaCheck) {
    'use strict';

    $.widget('am.productTabCaret', {
        options: {
            mediaBreakpoint: '(min-width: 768px)',
            classes: {
                caret: 'amtheme-caret',
                title: 'amtheme-item-title'
            },
            selectors: {
                title: '[data-amtheme-js="item-title"]',
                active: '.active'
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _create: function () {
            this._initSelectors();
            this._initNodes();
            this._initResponsive();
        },

        /**
         * @private
         * @returns {void}
         */
        _initSelectors: function () {
            this.itemTitle = this.element.find(this.options.selectors.title).addClass(this.options.classes.title);
        },

        /**
         * Set position and width based on the tab item title
         *
         * @param {string | number} [left]
         * @param {string | number} [width]
         * @param {string | number} [top]
         * @private
         * @returns {void}
         */
        _setCss: function (left, width, top) {
            this.caret.css({
                'left': left,
                'width': width,
                'top': top
            });
        },

        /**
         * @private
         * @returns {void}
         */
        _initNodes: function () {
            this.caret = $('<span>', {
                class: this.options.classes.caret
            });
        },

        /**
         * Set position and width to the caret and append it to the element
         *
         * @private
         * @returns {void}
         */
        _initCaret: function () {
            var options = this.options;

            this.itemTitleActive = this.element.find(options.selectors.title + options.selectors.active)[0];

            if (this.itemTitleActive) {
                this._setCss(
                    this.itemTitleActive.offsetLeft,
                    this.itemTitleActive.offsetWidth,
                    this.itemTitleActive.offsetTop + this.itemTitleActive.offsetHeight
                );

                this.element.append(this.caret);
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _initListeners: function () {
            var self = this;

            this.itemTitle.on('click', function (element) {
                self._setCss(
                    element.currentTarget.offsetLeft,
                    element.currentTarget.offsetWidth,
                    element.currentTarget.offsetTop + element.currentTarget.offsetHeight
                );
            });
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
                    self._initCaret();
                    self._initListeners();
                },
                exit: function () {
                    self.caret.remove();
                }
            });
        }
    });

    return $.am.productTabCaret;
});
