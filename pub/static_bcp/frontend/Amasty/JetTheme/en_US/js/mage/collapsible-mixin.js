/**
 * Mage collapsible mixin
 */

define([
    'jquery'
], function ($) {
    'use strict';

    return function (widget) {
        $.widget('mage.collapsible', widget, {
            options: {
                scrollTo: false,
                selectors: {
                    sliderSelector: '[data-amtheme-js="slider"]'
                }
            },

            /** @inheritDoc */
            _create: function () {
                this._super();

                if (!this.options.scrollTo) {
                    this.element.off('dimensionsChanged');
                }

                this.element.on('afterOpen', this._afterOpen.bind(this));
            },

            /** @inheritDoc */
            _open: function () {
                this._super();

                this.element.trigger('afterOpen');
            },

            /**
             * The function is called on "afterOpen" event
             *
             * @private
             * @returns {void}
             */
            _afterOpen: function () {
                var sliders = this.content.find(this.options.selectors.sliderSelector);

                if (sliders.length && sliders.hasClass('slick-initialized')) {
                    sliders.slick('setPosition');
                }
            }
        });

        return $.mage.collapsible;
    };
});
