/**
 * This widget add button close and disabled scroll to collapsible element
 */
define([
    'jquery'
], function ($) {
    'use strict';

    $.widget('am.layeredNavigationMobile', {
        options: {
            mediaBreakpoint: '(min-width: 768px)',
            selectors: {
                close: '[data-amtheme-js="layered-close"]',
                open: '[data-amtheme-js="filter-sidebar"]'
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _create: function () {
            this._initSelectors();
            this._initHandlers();
        },

        /**
         * @private
         * @returns {void}
         */
        _initSelectors: function () {
            this.closeElement = this.element.find(this.options.selectors.close);
            this.openElement = $(this.options.selectors.open);
        },

        /**
         * @private
         * @returns {void}
         */
        _initHandlers: function () {
            this.closeElement.on('click.hideVisibility.am.layered', this.closeFilterVisibility.bind(this));
            this.openElement.on('click.showVisibility.am.layered', this.openFilterVisibility.bind(this));
            this.element.off('dimensionsChanged');
        },

        /**
         * @returns {void}
         */
        closeFilterVisibility: function () {
            this.element.collapsible('deactivate');
        },

        /**
         * @returns {void}
         */
        openFilterVisibility: function () {
            this.element.collapsible('activate');
        }
    });

    return $.am.layeredNavigationMobile;
});
