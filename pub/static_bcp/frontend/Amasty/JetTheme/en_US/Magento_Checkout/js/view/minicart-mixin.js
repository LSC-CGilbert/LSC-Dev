/**
 * Mixin for minicart
 */

define([
    'jquery',
    'underscore'
], function ($, _) {
    'use strict';

    var mixin = {
        defaults: {
            minicartElement: '[data-block="minicart"]',
            dropdownDialogElement: '[data-role="dropdownDialog"]'
        },

        /** @inheritDoc */
        initialize: function () {
            var self = this,
                $minicartElement;

            this._super();

            $minicartElement = $(this.minicartElement);

            $minicartElement.on('contentLoading', function () {
                $minicartElement.on('contentUpdated', function () {
                    if (_.has(self, 'is_open_minicart') && self.is_open_minicart) {
                        self.openMinicart();
                    }
                });
            });

            return this;
        },

        /**
         * Open mini shopping cart.
         * @returns {void}
         */
        openMinicart: function () {
            $(this.minicartElement).find(this.dropdownDialogElement).dropdownDialog('open');
        }
    };

    return function (Minicart) {
        return Minicart.extend(mixin);
    };
});
