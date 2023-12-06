/**
 * Extend magento collapsible widget with only on mobile option
 */

define([
    'jquery',
    'matchMedia',
    'collapsible'
], function ($, mediaCheck) {
    'use strict';

    $.widget('am.collapsibleExtend', {
        options: {
            mediaBreakpoint: '(min-width: 768px)',
            collapseOptions: {
                active: false,
                collapsible: true,
                header: '[data-amcollapsible="title"]',
                content: '[data-amcollapsible="content"]',
                openedState: 'active'
            },
            mobileClass: '_am-mobile',
            isMobileOnly: false,
            isActive: false,
            isDisabled: false
        },

        /**
         * @private
         * @returns {void}
         */
        _create: function () {
            this._initCollapsible();

            if (this.options.isMobileOnly) {
                this.element.addClass(this.options.mobileClass);
                this._initResponsive();
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _initCollapsible: function () {
            this.element.collapsible(this.options.collapseOptions);

            if (this.options.isActive) {
                this.forceExpand();
            }

            if (this.options.isDisabled) {
                this.disableCollapsible();
            }
        },

        /**
         * @public
         * @returns {void}
         */
        enableCollapsible: function () {
            this.element.collapsible('deactivate');
            this.element.collapsible('option', 'collapsible', true);

            if (this.options.isActive) {
                this.forceExpand();
            }
        },

        /**
         * @public
         * @returns {void}
         */
        disableCollapsible: function () {
            this.element.collapsible('activate');
            this.element.collapsible('option', 'collapsible', false);
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
                    self.disableCollapsible();
                },
                exit: function () {
                    self.enableCollapsible();
                }
            });
        },

        /**
         * @public
         * @returns {void}
         */
        forceExpand: function () {
            this.element.collapsible('forceActivate');
        }
    });

    return $.am.collapsibleExtend;
});
