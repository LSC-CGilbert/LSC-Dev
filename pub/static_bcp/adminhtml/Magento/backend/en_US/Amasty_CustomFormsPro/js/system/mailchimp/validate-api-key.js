define([
    'jquery'
], function ($) {
    'use strict';

    $.widget('mage.amcformMailchimpApiKeyValidator', {
        options: {
            successText: '',
            failedText: '',
            url: '',
            elementId: '',
            fieldMapping: ''
        },

        _create: function () {
            this.element.on('click', this.validateKey.bind(this));
        },

        validateKey: function () {
            var buttonTitle = this.options.failedText,
                element =  $('#' + this.options.elementId),
                self = this;
            element.removeClass('success').addClass('fail');

            $.ajax({
                method: 'GET',
                cache: false,
                url: self.options.url,
                showLoader: true,
                data: self._collectParams()
            }).done(function (response) {
                if (response.success) {
                    element.removeClass('fail').addClass('success');
                    buttonTitle = self.options.successText;
                }
            }).always(function () {
                if (buttonTitle) {
                    $('#' + self.options.elementId + '_result').text(buttonTitle);
                }
            });
        },

        _collectParams: function () {
            var params = {};

            $.each(this.options.fieldMapping, function (key, el) {
                params[key] = $('#amasty_customform_mailchimp_' + el).val();
            });

            return params;
        }
    });

    return $.mage.connectionchecker;
});
