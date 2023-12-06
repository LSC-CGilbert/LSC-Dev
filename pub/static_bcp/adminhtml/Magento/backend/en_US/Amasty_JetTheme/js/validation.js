require([
    'jquery',
    'mage/translate',
    'jquery/validate'
], function ($) {
    $.validator.addMethod(
        'validate-css-size', function (v) {
            var sizeValue = new RegExp(/^([\d]{1,3}\%)|([\d]{1,4}px)$/i);

            if ($.mage.isEmptyNoTrim(v)) {
                return true
            }

            return sizeValue.test(v);
        },
        $.mage.__('Value must be in format (100% or 1024px for example)')
    );
});
