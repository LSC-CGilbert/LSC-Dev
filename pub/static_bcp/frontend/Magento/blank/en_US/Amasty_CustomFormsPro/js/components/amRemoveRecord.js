/**
 * Remove Record Component
 */

define([
    'jquery',
    'mage/url',
    'uiRegistry',
    'mage/translate'
], function ($, urlBuilder, registry, $t) {

    urlBuilder.setBaseUrl(window.BASE_URL);

    /**
     * Show popup and remove record on 'yes' button
     *
     * @param {number} id
     * @param {boolean} is_can_resubmit
     * @param {function} callback
     */
    return function (id, is_can_resubmit, callback) {
        var popup = registry.get('popup'),
            type = 'prompt',
            header = $t('Are you sure you would like to delete this submitted data?'),
            description = $t('This form can be submitted only once. You will not be able to re-submit it.');

        if (!is_can_resubmit && typeof is_can_resubmit !== 'undefined' && is_can_resubmit !== null) {
            popup.description(description);
        }

        popup.type(type);
        popup.header(header);

        popup.buttons.push({
            'text': 'No',
            'classes': '-default',
            'callback': function () {
                popup.hide();
            }
        });
        popup.buttons.push({
            'text': 'Yes',
            'classes': '-error',
            'callback': function () {
                $.ajax({
                    url:  urlBuilder.build('rest/V1/amasty_customform_pro/submitted_data/answer/{id}'.replace('{id}', id.toString())),
                    showLoader: true,
                    type: 'DELETE',
                    dataType: 'json',
                    success: callback,
                    error: function (response) {
                        console.error('Some type of ' + response.statusText + ' with code: ' + response.status);
                    }
                });

                popup.hide();
            }
        });

        popup.show();
    };
});
