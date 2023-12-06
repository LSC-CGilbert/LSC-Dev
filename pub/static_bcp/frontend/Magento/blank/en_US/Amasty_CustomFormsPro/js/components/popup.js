/**
 * Popup UI Component
 */

define([
    'jquery',
    'ko',
    'uiComponent',
], function ($, ko, Component) {
    'use strict';

    return Component.extend({
        defaults: {},
        classes: {
            active: '-active',
            openPopup: '-popup-opened'
        },
        selectors: {
            wrapper: '[data-amcform-js="popup"]',
            inner: '[data-amcform-js="popup-inner"]'
        },

        /**
         * Init observable variables
         *
         * @return {Object}
         */
        initObservable: function () {
            this._super()
                .observe({
                    isActive: false,
                    header: false,
                    content: false,
                    description: false,
                    messagesList: [],
                    buttons: [],
                    type: false
                });

            return this;
        },

        /**
         * Initializes component
         */
        initialize: function () {
            var self = this;

            self._super();

            self._initNodes();

            self.wrapper.click(function (event) {
                if (self.wrapper.is(event.target)) {
                    self.hide();
                }
            });
        },

        /**
         * @private
         * @return {void}
         */
        _initNodes: function () {
            this.wrapper = $(this.selectors.wrapper);
            this.body = $('body');
        },

        /**
         * @public
         * @return {void}
         */
        show: function () {
            this.wrapper.addClass(this.classes.active);
            this.body.addClass(this.classes.openPopup);
            $(this.selectors.inner).focus();
        },

        /**
         * @public
         * @return {void}
         */
        hide: function () {
            this._clear();
            this.wrapper.removeClass(this.classes.active);
            this.body.removeClass(this.classes.openPopup);
        },

        /**
         * @private
         * @return {void}
         */
        _clear: function () {
            this.header(false);
            this.description(false);
            this.messagesList([]);
            this.buttons([]);
            this.type(false);
        },
    });
});
