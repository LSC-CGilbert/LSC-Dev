define([
    'ko',
    'jquery',
    'underscore'
], function (ko, $, _) {
    'use strict';

    var mixin = {
        defaults: {
            floatingMessages: false,
            isVisible: ko.observable(false),
            isMessageSticky: ko.observable(false),
            delays: {
                hideEventDelay: 5000,
                scrollEventDelay: 0
            },
            selectors: {
                messagesInnerWrapper: '[data-amtheme-js="amtheme-messages"]',
                messageContainer: '[data-amtheme-js="page-messages"]',
                singleMessage: '[data-amtheme-js="message"]',
                singleMessageClose: '[data-amtheme-js="message-close"]',
                offsetTopElements: '.-sticky-header.-show, '
                    + '.amsticky-cart-block.-amsticky-cart-active, '
                    + '.ammenu-nav-sections.-sticky .ammenu-main-container, '
                    + '.ammenu-header-container.-sticky .header.content'
            }
        },

        /**
         * @inheritDoc
         */
        initialize: function () {
            this._super();

            if (this.floatingMessages) {
                this.initVariables();
                this.initListeners();
            }

            this.setVisibility();
        },

        /**
         * @return {void}
         */
        initVariables: function () {
            this.body = $('body');
            this.messageContainer = $(this.selectors.messageContainer);
            this.messageWrapper = $(this.selectors.messagesInnerWrapper);
        },

        /**
         * @return {void}
         */
        initListeners: function () {
            this.initObservables();
            this.initScrollListener();
        },

        /**
         * Subscribe for variables
         * @return {void}
         */
        initObservables: function () {
            var self = this;

            self.messages.subscribe(function () {
                // the small delay to let message-element
                // to be rendered before recalculation
                _.delay(function () {
                    self.triggerOtherStickyElements();
                }, 100);
            });

            self.isMessageSticky.subscribe(function (res) {
                if (res) {
                    self.setOnStickyActions();
                } else {
                    self.setOffStickyActions();
                }
            });
        },

        /**
         * Add visibility-class for messages container only after doc is ready
         * to avoid flickering close-button during the page loading
         * @return {void}
         */
        setVisibility: function () {
            // eslint-disable-next-line
            $(document).ready(function () {
                this.isVisible(true);
            }.bind(this));
        },

        /**
         * Set toggling sticky messages on scroll
         * @return {void}
         */
        initScrollListener: function () {
            var self = this;

            $(window).on('scroll', _.debounce(function () {
                self.handleStickyMessage();

                if (self.isMessageSticky()) {
                    self.setOnStickyActions();
                }
            }, self.delays.scrollEventDelay));
        },

        /**
         * Set top position for sticky message
         * depending on other active sticky elements
         * @return {void}
         */
        setOnStickyActions: function () {
            var topPosition = 0,
                stickyElementsBottoms = [],
                offsetTopElements = $(this.selectors.offsetTopElements);

            if (offsetTopElements.length) {
                _.each(offsetTopElements, function (elem) {
                    stickyElementsBottoms.push($(elem).position().top + $(elem).outerHeight());
                });

                topPosition = Math.max.apply(Math, stickyElementsBottoms);
            }

            this.messageWrapper.css('top', topPosition);
            this.triggerOtherStickyElements();
        },

        /**
         * Toggle sticky position depending on default message visibility
         * @return {void}
         */
        handleStickyMessage: function () {
            var isMessageVisible = this.isScrolledIntoView(this.messageContainer);

            if (isMessageVisible) {
                this.isMessageSticky(false);
                this.messageContainer.height('');
            } else {
                this.messageContainer.height(this.messageWrapper.outerHeight());
                this.isMessageSticky(true);
            }
        },

        /**
         * Hide message
         * @param {Object} element
         * @return {void}
         */
        hideMessage: function (element) {
            var singleMessage;

            if ($(element).length) {
                singleMessage = $(element).is(this.selectors.singleMessage)
                    ? $(element) : $(element).closest(this.selectors.singleMessage);
                singleMessage.fadeOut();

                this.triggerOtherStickyElements();
            }
        },

        /**
         * Hide message with delay
         * @param {Object} element
         * @return {void}
         */
        autoHideMessage: function (element) {
            var self = this;

            _.delay(function () {
                self.hideMessage(element);
            }, self.delays.hideEventDelay);
        },

        /**
         * Check if the element is visible on screen
         * @param {Object} element
         * @return {boolean}
         */
        isScrolledIntoView: function (element) {
            var docViewTop = $(window).scrollTop(),
                docViewBottom = docViewTop + $(window).height(),
                elemTop = $(element).offset().top,
                elemBottom = elemTop + $(element).height();

            return (elemBottom <= docViewBottom) && (elemTop >= docViewTop);
        },

        /**
         * Body triggered event for external use
         * @return {void}
         */
        triggerOtherStickyElements: function () {
            this.body.trigger('recalculateStickyElementsPosition');
        },

        /**
         * Extend point for external use and mixins
         * @return {mixin}
         */
        setOffStickyActions: function () {
            return this;
        }
    };

    return function (Messages) {
        return Messages.extend(mixin);
    };
});
