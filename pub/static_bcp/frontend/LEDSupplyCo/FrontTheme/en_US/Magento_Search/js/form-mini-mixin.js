/**
 * Add support resize for a popup search autocomplete
 */
define([
    'jquery'
], function ($) {
    'use strict';

    return function (formSearch) {
        $.widget('mage.quickSearch', formSearch, {

            /**
             * @override
             */
            _create: function () {
                this._super();
                $(window).on('resize', this._resizeHandler.bind(this));
            },

            /**
             * @private
             * @returns {void}
             */
            _resizeHandler: function () {
                var searchField,
                    clonePosition;

                if (this.isActive()) {
                    searchField = this.element;
                    clonePosition = {
                        position: 'absolute',
                        width: searchField.outerWidth()
                    };
                    this.autoComplete.css(clonePosition);
                }
            }
        });

        return $.mage.quickSearch;
    };
});
