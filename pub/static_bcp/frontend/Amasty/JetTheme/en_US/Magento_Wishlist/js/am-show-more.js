/**
 *   More button for wishlist item on mobile view
 */

define([
    'jquery'
], function ($) {
    'use strict';

    $.widget('mage.amShowMoreButton', {
        options: {
            hideSelector: '.product-details, .comment-box, .amtheme-update-box > .amtheme-update'
        },

        /**
         * Widget initialization
         * @private
         * @returns {void}
         */
        _create: function () {
            var self = this,
                moreButton = this.element;

            moreButton.on('click', function (e) {
                e.preventDefault();

                self.showDetails();
            });
        },

        /**
         * @returns {void}
         */
        showDetails: function () {
            this.element.parent().find(this.options.hideSelector).show();
            this.element.hide();
        }
    });

    return $.mage.amShowMoreButton;
});
