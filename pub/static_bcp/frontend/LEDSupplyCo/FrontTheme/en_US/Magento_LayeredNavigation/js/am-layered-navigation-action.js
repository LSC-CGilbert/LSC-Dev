/**
 * Addition actions for layered navigation
 */
define([
    'jquery',
    'matchMedia'
], function ($, mediaCheck) {
    'use strict';

    $.widget('am.layeredNavigationAction', {
        options: {
            mediaBreakpoint: '(min-width: 768px)',
            oneColumnLayoutClass: 'page-layout-1column',
            selectors: {
                navigationFilterItem: '[data-amtheme-js="navigation-filter-item"]'
            }
        },

        /**
         * Widget initialization
         * @private
         * @returns {void}
         */
        _create: function () {
            if (this._oneColumnLayoutCheck() && this._tabletCheck()) {
                this._initHandlers();
            }
        },

        /**
         * Check device is tablet or desktop
         * @private
         * @returns {Boolean}
         */
        _tabletCheck: function () {
            var self = this,
                isTabletView = false;

            mediaCheck({
                media: self.options.mediaBreakpoint,
                entry: function () {
                    isTabletView = true;
                },
                exit: function () {
                    isTabletView = false;
                }
            });

            return isTabletView;
        },

        /**
         * Check layout is 1Column
         * @private
         * @returns {Boolean}
         */
        _oneColumnLayoutCheck: function () {
            var isOneColumnLayout = false;

            if ($('body').hasClass(this.options.oneColumnLayoutClass)) {
                isOneColumnLayout = true;
            }

            return isOneColumnLayout;
        },

        /**
         * Add event when filter collapsible
         * @private
         * @returns {void}
         */
        _initHandlers: function () {
            var self = this,
                filterItems = $(this.element).find(this.options.selectors.navigationFilterItem);

            $(filterItems).on('dimensionsChanged', function (event, data) {
                var opened = data.opened,
                    element = this;

                if (opened) {
                    self._addEventListener(element);

                    return;
                }

                self._offEventListener();
            });
        },

        /**
         * Add event on body
         * @private
         * @param {Object} [element]
         * @returns {void}
         */
        _addEventListener: function (element) {
            var self = this;

            $('body').on('click.outsideFilter', function (event) {
                if (!$.contains(element, event.target)) {
                    $(element).collapsible('deactivate');
                    self._offEventListener();
                }
            });
        },

        /**
         * Remove event from body
         * @private
         * @returns {void}
         */
        _offEventListener: function () {
            $('body').off('click.outsideFilter');
        }
    });

    return $.am.layeredNavigationAction;
});
