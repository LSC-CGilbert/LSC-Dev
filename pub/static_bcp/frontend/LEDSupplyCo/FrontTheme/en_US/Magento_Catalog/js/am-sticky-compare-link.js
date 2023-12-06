/**
 * Sticky Compare Link Widget
 */
define([
    'jquery',
    'underscore'
], function ($, _) {
    'use strict';

    $.widget('am.stickyCompareLink', {
        options: {
            resizeEventDelay: 150,
            fixedStickyOffsetTop: 20,
            referenceElement: 'body',
            defaultReferenceElement: '#maincontent > .columns',
            fixedCssClass: '-fixed',
            offsetTopElements: ''
        },

        /**
         * @private
         * @returns {void}
         */
        _create: function () {
            var toggleFixedState = this._toggleFixedState.bind(this),
                initElementsStates = _.debounce(
                    this._initElementsStates.bind(this),
                    this.options.resizeEventDelay
                ),
                widgetElements;

            this._initElements();
            this._initElementsStates();

            widgetElements = this.options.elements;

            widgetElements.windowGlobal.off('scroll.amStickyCompareLink', toggleFixedState)
                .on('scroll.amStickyCompareLink', toggleFixedState);

            widgetElements.windowGlobal.off('resize.amStickyCompareLink', initElementsStates)
                .on('resize.amStickyCompareLink', initElementsStates);

            $('body').on('recalculateStickyElementsPosition', function () {
                this._initElementsStates();
            }.bind(this));
        },

        /**
         * @private
         * @returns {void}
         */
        _initElements: function () {
            this.options.elements = {
                windowGlobal: $(window),
                mainElement: this.element,
                referenceElement: $(this.options.referenceElement).length
                    ? $(this.options.referenceElement) : $(this.options.defaultReferenceElement)
            };
        },

        /**
         * Set Sticky Compare Link offset top by reference element
         * @private
         * @returns {void}
         */
        _setStickyCompareLinkTop: function () {
            var widgetElements = this.options.elements;

            if (widgetElements.referenceElement.length) {
                this.options.stickyOffsetTop = widgetElements.referenceElement.offset().top;
                widgetElements.mainElement.css('top', this.options.stickyOffsetTop);
            }
        },

        /**
         * Toggle Sticky Compare Link fixed state
         * @private
         * @returns {void}
         */
        _toggleFixedState: function () {
            var widgetOptions = this.options,
                widgetElements = widgetOptions.elements,
                fixedBreakpoint = widgetOptions.stickyOffsetTop - widgetOptions.fixedStickyOffsetTop,
                overScrollState = widgetElements.windowGlobal.scrollTop() > fixedBreakpoint;

            widgetElements.mainElement
                .toggleClass(widgetOptions.fixedCssClass, overScrollState)
                .css('top', overScrollState ? this.getOffsetTop() : widgetOptions.stickyOffsetTop);
        },

        /**
         * Get offset top
         * @returns {*|number}
         */
        getOffsetTop: function () {
            var topPosition = 0,
                stickyElementsBottoms = [],
                widgetOptions = this.options,
                offsetTopElements = $(widgetOptions.offsetTopElements);

            if (offsetTopElements.length) {
                _.each(offsetTopElements, function (elem) {
                    stickyElementsBottoms.push($(elem).position().top + $(elem).height());
                });

                topPosition = Math.max.apply(Math, stickyElementsBottoms);
            }

            return offsetTopElements.length
                ? topPosition + widgetOptions.fixedStickyOffsetTop
                : widgetOptions.fixedStickyOffsetTop;
        },

        /**
         * Initialization elements states
         * @private
         * @returns {void}
         */
        _initElementsStates: function () {
            this._setStickyCompareLinkTop();
            this._toggleFixedState();
        }
    });

    return $.am.stickyCompareLink;
});
