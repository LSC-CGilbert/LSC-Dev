define([
    'jquery',
    'Amasty_Customform/js/form-filler'
], function ($, FormFiller) {
   'use_strict';

    $.widget('mage.amFormFill', FormFiller, {
        options: {
            formParams: {
                form_values: {}
            }
        },

        /**
         * @return {jQuery.Deferred}
         */
        getDataSource: function () {
            var result = $.Deferred();

            return result.resolve(this.options.formParams.form_values);
        }
    });

    return $.mage.amFormFill;
});
