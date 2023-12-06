define([
    'jquery',
    'mage/mage'
], function ($) {
    'use strict';

    $.widget('am.reorderValidation', {
        options: {
            errotTargetSelector: '[data-amtheme-js="reorder-advice"]'
        },

        /**
         * @private
         * @returns {void}
         */
        _create: function () {
            var self = this;

            this.element.mage('validation', {
                errorPlacement: function (error) {
                    error.appendTo(self.options.errotTargetSelector);
                }
            });
        }
    });

    return $.am.reorderValidation;
});
