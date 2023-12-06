/**
 *   File upload behavior
 */

define([
    'jquery'
], function ($) {
    'use strict';

    $.widget('mage.amFileUpload', {
        options: {
            inputField: '[data-amtheme-js="input-field"]',
            inputTriggerSelector: '[data-amtheme-js="input-trigger"]',
            fileOutputSelector: '[data-amtheme-js="file-output"]',
            clearOutputSelector: '[data-amtheme-js="clear-output"]',
            emptyFileUpload: '[data-amtheme-js="file-nofile"]'
        },

        /**
         * Widget initialization
         * @private
         * @returns {void}
         */
        _create: function () {
            var self = this,
                options = this.options;

            this.inputField = this.element.find(options.inputField);
            this.inputTriggerBlock = this.element.find(options.inputTriggerSelector);
            this.fileOutputBlock = this.element.find(options.fileOutputSelector);
            this.clearOutputBlock = this.element.find(options.clearOutputSelector);
            this.emptyFileUpload = this.element.find(options.emptyFileUpload);

            this.setOutputFileName();

            this.clearOutputBlock.on('click', function () {
                self.clearOutputValue();
            });

            this.inputTriggerBlock.on('keydown', function (event) {
                if (event.keyCode === 13 || event.keyCode === 32) {
                    // eslint-disable-next-line
                    $(self.inputField).focus();
                }
            });
        },

        /**
         * Cut file path(value from input) and set it to output block
         * @returns {void}
         */
        setOutputFileName: function () {
            var self = this;

            $(this.inputField).on('change', function () {
                self.emptyFileUpload.hide();
                self.fileOutputBlock.text(this.value.replace(/^.*[\\/]/, ''))
                    .toggleClass('-has-content', Boolean(this.value));
            });
        },

        /**
         * Remove value in the output block; clear input value
         * @returns {void}
         */
        clearOutputValue: function () {
            this.fileOutputBlock.text('').removeClass('-has-content');
            this.emptyFileUpload.show();
            $(this.inputField).val('');
        }
    });

    return $.mage.amFileUpload;
});
