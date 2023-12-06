define([
    'jquery',
    'matchMedia',
    'mage/translate'
], function ($, mediaCheck, $t) {
    'use strict';

    $.widget('am.layeredNavigationToggle', {
        options: {
            mediaBreakpoint: '(min-width: 768px)',
            textHide: $t('Hide Filters'),
            textShow: $t('Show Filters'),
            hideClass: '-hide',
            activeClass: '-filter-active',
            notActiveClass: '-filter-inactive',
            selectors: {
                title: '[data-amtheme-js="filter-title"]',
                titleText: '[data-amtheme-js="filter-title-text"]'
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _create: function () {
            this._initSelectors();
            this._initState();
            this._initResponsive();
        },

        /**
         * @private
         * @returns {void}
         */
        _initSelectors: function () {
            this.body = $('body');
            this.titleTextElement = this.element.find(this.options.selectors.titleText);
        },

        /**
         * @private
         * @returns {void}
         */
        _initState: function () {
            this.activeFilter = true;
            this.options.textBase = this.titleTextElement.text();
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
                    self._toggleDesktopMode();
                },
                exit: function () {
                    self._toggleMobileMode();
                }
            });
        },

        /**
         * @private
         * @returns {void}
         */
        _toggleDesktopMode: function () {
            this.wasDesktop = true;
            this.titleTextElement.text($.mage.__(this.options.textHide));
            this.element.on('click.changeVisibility.am.layered', this.changeFilterVisibility.bind(this));
        },

        /**
         * @returns {void}
         */
        changeFilterVisibility: function () {
            if (this.activeFilter) {
                this.showFilterSidebar();

                return;
            }

            this.hideFilterSidebar();
        },

        /**
         * @returns {void}
         */
        showFilterSidebar: function () {
            this.titleTextElement.text(this.options.textShow);
            this.activeFilter = false;
            this.body.removeClass(this.options.activeClass)
                .addClass(this.options.notActiveClass)
                .trigger('nav.updated');
        },

        /**
         * @returns {void}
         */
        hideFilterSidebar: function () {
            this.body.removeClass(this.options.notActiveClass)
                .addClass(this.options.activeClass)
                .trigger('nav.updated');
            this.titleTextElement.text(this.options.textHide);
            this.activeFilter = true;
        },

        /**
         * @private
         * @returns {void}
         */
        _toggleMobileMode: function () {
            if (this.wasDesktop) {
                this.titleTextElement.text($.mage.__(this.options.textBase));
                this.element.off('click.changeVisibility.am.layered');
            }
        }
    });

    return $.am.layeredNavigationToggle;
});
