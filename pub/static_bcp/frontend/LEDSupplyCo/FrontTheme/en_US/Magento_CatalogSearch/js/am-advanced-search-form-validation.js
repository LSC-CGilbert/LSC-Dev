define([
    'jquery',
    'mage/mage',
    'mage/translate'
], function ($) {
    'use strict';

    $.widget('am.advancedSearchFormValidation', {
        /**
         * @private
         * @returns {void}
         */
        _create: function () {
            this.element.mage('validation', {
                errorPlacement: function (error, element) {
                    var parent = element.parent();

                    if (parent.hasClass('range')) {
                        parent.find(this.errorElement + '.' + this.errorClass).remove().end().append(error);
                    } else {
                        error.insertAfter(element);
                    }
                },
                messages: {
                    'price[to]': {
                        'greater-than-equals-to': $.mage.__('Please enter a valid price range.')
                    },
                    'price[from]': {
                        'less-than-equals-to': $.mage.__('Please enter a valid price range.')
                    }
                }
            });
        }
    });

    return $.am.advancedSearchFormValidation;
});
