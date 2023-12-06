define([
    'jquery'
], function ($) {
    'use strict';

    $.widget('am.popup', {
        options: {
            trigger: null,
            classes: {
                active: '-amtheme-active',
                popupOpened: '-ampopup-opened'
            },
            isPopupShown: false,
            selectors: {
                popupOverlay: '[data-amtheme-js="popup-overlay"]',
                backButton: '[data-amtheme-js="popup-close"]'
            },
            isClosedByOuterClick: false
        },

        /**
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
        _initSelectors: function () {
            var options = this.options;

            if (options.trigger) {
                if (options.trigger.charAt(0) === '#' || options.trigger.charAt(0) === '.') {
                    this.openTrigger = $(options.trigger);
                } else {
                    this.openTrigger = $('[data-amtheme-js="' + options.trigger + '"]');
                }
            } else {
                this.openTrigger = options.trigger;
            }

            this.popup = this.element;
            this.backButton = this.popup.find(options.selectors.backButton);
            this.isPopupShown = this.options.isPopupShown;
        },

        /**
         * @private
         * @returns {void}
         */
        _initListeners: function () {
            var self = this;

            if (this.openTrigger) {
                this.openTrigger.off('click.amPopup').on('click.amPopup', function (element) {
                    element.preventDefault();
                    self._togglePopup();
                });
            }

            this.backButton.off('click.amPopup').on('click.amPopup', function () {
                self._togglePopup();
            });

            if (this.options.isClosedByOuterClick) {
                this._initOuterCLose();
            }
        },

        /**
         * Add popup active class and trigger the event "am.popupOpened"
         * @returns {void}
         */
        openPopup: function () {
            this.popup.addClass(this.options.classes.active).focus();
            $('body').addClass(this.options.classes.popupOpened);

            this.isPopupShown = true;

            this.element.trigger('am.popupOpened');
        },

        /**
         * Remove popup active class and trigger the event "am.popupClosed"
         * @returns {void}
         */
        closePopup: function () {
            this.popup.removeClass(this.options.classes.active);
            $('body').removeClass(this.options.classes.popupOpened);

            this.isPopupShown = false;

            this.element.trigger('am.popupClosed');
        },

        /**
         * Close popup on overlay click
         * @private
         * @returns {void}
         */
        _initOuterCLose: function () {
            $(this.popup).on('click', function (e) {
                if ($(e.target).is(this.options.selectors.popupOverlay)) {
                    this.closePopup();
                }
            }.bind(this));
        },

        /**
         * Toggle popup active class
         * @private
         * @returns {void}
         */
        _togglePopup: function () {
            if (this.isPopupShown) {
                this.closePopup();
            } else {
                this.openPopup();
            }
        }
    });

    return $.am.popup;
});
