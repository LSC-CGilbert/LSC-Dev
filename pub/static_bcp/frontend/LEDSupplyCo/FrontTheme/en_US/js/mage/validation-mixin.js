define([
    'jquery',
    'jquery/validate',
    'mage/translate'
], function ($) {
    'use strict';

    return function () {
        var customRules = {
            'am-validate-grouped-qty': [
                function (value, element, params) {
                    var result = false,
                        total = 0;

                    $(element)
                        .parents(params)
                        .find('input[data-validate*="validate-grouped-qty"]')
                        // eslint-disable-next-line consistent-return
                        .each(function (i, e) {
                            var val = $(e).val(),
                                valInt;

                            if (val && val.length > 0) {
                                result = true;
                                valInt = parseFloat(val) || 0;

                                if (valInt >= 0) {
                                    total += valInt;
                                } else {
                                    result = false;

                                    return result;
                                }
                            }
                        });

                    return result && total > 0;
                },
                $.mage.__('Please specify the quantity of product(s).')
            ],
            'am-validate-one-checkbox-required-by-name': [
                function (value, element, params) {
                    var checkedCount = 0,
                        container = $(element).parents('#' + params);

                    if (element.type === 'checkbox') {
                        container.find('[name="' + element.name + '"]').each(
                            // eslint-disable-next-line consistent-return
                            function () {
                                if ($(this).is(':checked')) {
                                    checkedCount += 1;

                                    return false;
                                }
                            }
                        );
                    }

                    if (checkedCount > 0) {
                        container.removeClass('validation-failed');
                        container.addClass('validation-passed');

                        return true;
                    }

                    container.addClass('validation-failed');
                    container.removeClass('validation-passed');

                    return false;
                },
                $.mage.__('Please select one of the options.')
            ]
        };

        $.each(customRules, function (i, rule) {
            rule.unshift(i);
            $.validator.addMethod.apply($.validator, rule);
        });
    };
});
