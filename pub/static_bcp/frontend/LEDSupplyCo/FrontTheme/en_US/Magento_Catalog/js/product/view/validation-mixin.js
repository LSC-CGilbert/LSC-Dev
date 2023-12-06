define([
    'jquery'
], function ($) {
    'use strict';

    var validationMixin = {
        options: {
            validationRuleName: 'validate-one-checkbox-required-by-name',
            dataValidateAttr: 'data-validate',
            errorMessageBoxAttr: 'data-errors-message-box',
            errorMessageContainerId: '#links-advice-container',
            errorPopupMessageContainerId: '#popup-links-advice-container',

            /**
             * @param {*} error
             * @param {HTMLElement} element
             * @returns {void}
             */
            errorPlacement: function (error, element) {
                var messageBox,
                    dataValidate,
                    popupMessageContainer;

                if ($(element).hasClass('datetime-picker')) {
                    // eslint-disable-next-line no-param-reassign
                    element = $(element).parent();

                    if (element.parent().find('[generated=true].mage-error').length) {
                        return;
                    }
                }

                if (element.attr(this.errorMessageBoxAttr)) {
                    messageBox = $(element.attr(this.errorMessageBoxAttr));
                    messageBox.html(error);

                    return;
                }

                dataValidate = element.attr(this.dataValidateAttr);
                popupMessageContainer = $(this.errorPopupMessageContainerId);

                if (dataValidate
                    && dataValidate.indexOf('am-' + this.validationRuleName) > 0
                    && popupMessageContainer.length) {
                    error.appendTo(popupMessageContainer);
                } else if (dataValidate && dataValidate.indexOf(this.validationRuleName) > 0) {
                    error.appendTo(this.errorMessageContainerId);
                } else if (element.is(':radio, :checkbox')) {
                    element.closest(this.radioCheckboxClosest).after(error);
                } else {
                    element.after(error);
                }
            }
        }
    };

    return function (targetWidget) {
        $.widget('mage.validation', targetWidget, validationMixin);

        return $.mage.validation;
    };
});
