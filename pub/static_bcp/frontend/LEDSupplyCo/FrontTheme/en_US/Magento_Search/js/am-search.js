define([
    'jquery',
    'underscore'
], function ($, _) {
    'use strict';

    $.widget('am.search', {
        options: {
            nameClassHide: 'am-opacity-clear',
            delay: 300,
            searchInputSelector: '[data-amtheme-js="search-input"]',
            resetButtonSelector: '[data-amtheme-js="search-reset"]',
            closeButtonSelector: '[data-amtheme-js="search-close"]'
        },

        /**
         * Create search actions for mobile
         * @protected
         * @returns {void}
         */
        _create: function () {
            this.searchInput = this.element.find(this.options.searchInputSelector);
            this.resetButton = this.element.find(this.options.resetButtonSelector);
            this.closeButton = this.element.find(this.options.closeButtonSelector);
            this.changeVisibilityElement(this.resetButton);
            this._bind();
        },

        /**
         * Bind event handlers
         * @protected
         * @returns {void}
         */
        _bind: function () {
            this.resetButton.on('click', this.clickResetButton.bind(this));
            this.closeButton.on('click.amsearch', this.hideCloseButton.bind(this));
            this.searchInput.on('change.amsearch', _.debounce(this.changeInput.bind(this), this.delay));
            this.searchInput.on('input.amsearch', _.debounce(this.changeInput.bind(this), this.delay));
            this.searchInput.on('focus.amsearch focusin.amsearch', this.showCloseButton.bind(this));
            this.searchInput.on('blur.amsearch', this.hideCloseButton.bind(this));
        },

        /**
         * @param {Object} event
         * @returns {void}
         */
        clickResetButton: function (event) {
            this.checkedIsEmptyInput(event);
        },

        /**
         * @param {Object} event
         * @returns {void}
         */
        checkedIsEmptyInput: function (event) {
            event.preventDefault();

            if (this.isEmptySearchInput()) {
                this.searchInput.blur();
            } else {
                this.searchInput.val('');
                this.searchInput.focus();
            }
        },

        /**
         * @returns {Boolean}
         */
        isEmptySearchInput: function () {
            return this.searchInput.val().length === 0;
        },

        /**
         * @returns {void}
         */
        changeInput: function () {
            this.changeVisibilityElement(this.resetButton);
        },

        /**
         * @param {jQuery} element
         * @returns {void}
         */
        changeVisibilityElement: function (element) {
            if (this.isEmptySearchInput()) {
                element.addClass(this.options.nameClassHide);
            } else if (element.hasClass(this.options.nameClassHide)) {
                element.removeClass(this.options.nameClassHide);
            }
        },

        hideCloseButton: function () {
            this.closeButton.addClass(this.options.nameClassHide);
            this.closeButton.prop('disabled', true);
        },

        showCloseButton: function () {
            if (this.closeButton.hasClass(this.options.nameClassHide)) {
                this.closeButton.removeClass(this.options.nameClassHide);
                this.closeButton.prop('disabled', false);
            }
        }
    });

    return $.am.search;
});
