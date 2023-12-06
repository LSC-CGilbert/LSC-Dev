define([
    'jquery',
    'mage/translate',
    'mage/backend/validation',
    'jquery/validate'
], function ($, $t) {
    'use strict';

    $.widget('mage.amThankYouPageCreateAccountForm', {
        options: {
            successContainerSelector: '',
            errorContainerSelector: '',
            errorMessage: $t('Error occurred')
        },

        _create: function () {
            this.form = this.element;
            this.successContainer = $(this.options.successContainerSelector);
            this.errorContainer = $(this.options.errorContainerSelector);

            this._initSubmitEvent();
        },

        _initSubmitEvent: function () {
            this.form.on('submit', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                this.errorContainer.hide();

                if (this.form.validation('isValid')) {
                    $.ajax({
                        type: 'post',
                        url: this.form.attr('action'),
                        data: this.form.serialize(),
                        cache: false,
                        showLoader: 'true'
                    })
                    .fail(this._showError.bind(this, this.options.errorMessage))
                    .done(function (response) {
                        if (response.errors) {
                            this._showError(response.message);
                        } else {
                            this._showSuccess(response.message);
                        }
                    }.bind(this));
                }

                return false;
            }.bind(this));
        },

        _showSuccess(message) {
            this.successContainer.html(message);
            this.successContainer.show();
            this.form.hide();
        },

        _showError(message) {
            this.errorContainer.html(message);
            this.errorContainer.show();
        }
    });

    return $.mage.amThankYouPageCreateAccountForm;
});
