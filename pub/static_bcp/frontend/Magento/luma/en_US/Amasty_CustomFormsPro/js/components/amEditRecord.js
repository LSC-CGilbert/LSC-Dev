/**
 * Edit Record Component
 */

define([
    'jquery',
    'mage/url',
    'amcformMessageList'
], function ($, urlBuilder, messageList) {

    urlBuilder.setBaseUrl(window.BASE_URL);

    /**
     * Show popup and render form
     *
     * @param {number} id
     * @param {string} type
     */
    return function (id, type) {
        var replacer = 'amform-show-popup -hidden -form-edit' + (type ? (' -' + type) : '');

        $.ajax({
            url: urlBuilder.build('amasty_customform_pro/submittedData/edit'),
            data: {'answer_id': id},
            showLoader: true,
            dataType: 'json',
            success: function (data) {
                if (data instanceof Object && !data.messages.length) {
                    $('body').append(data.form_html.replace('amform-show-popup', replacer));
                }

                if (data.messages.length > 0) {
                    data.messages.forEach(function (message) {
                        messageList.addErrorMessage({message: message});
                    });
                }
            },
            error: function (response) {
                console.warn(response);

                if (response.responseText) {
                    console.error(response.responseText);
                }
            }
        });
    };
});
