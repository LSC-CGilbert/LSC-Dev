define([
    'jquery'
], function ($) {
    'use strict';

    var downloadableMixin = {
        /**
         * Reload all-elements-checkbox's label
         * @private
         * @returns {void}
         */
        reloadAllCheckText: function () {
            var allChecked = true,
                allElementsCheck = $(this.options.allElements),
                allElementsLabel = $('label[for="' + allElementsCheck.attr('id') + '"] > span');

            this.element.find(this.options.linkElement).each(function () {
                if (!this.checked) {
                    allChecked = false;
                }
            });

            if (allChecked) {
                allElementsLabel.text(allElementsCheck.attr('data-checked'));
                allElementsCheck.prop('checked', true);
            } else {
                allElementsLabel.text(allElementsCheck.attr('data-notchecked'));
                allElementsCheck.prop('checked', false);
            }
        }
    };

    return function (targetWidget) {
        $.widget('mage.downloadable', targetWidget, downloadableMixin);

        return $.mage.downloadable;
    };
});
