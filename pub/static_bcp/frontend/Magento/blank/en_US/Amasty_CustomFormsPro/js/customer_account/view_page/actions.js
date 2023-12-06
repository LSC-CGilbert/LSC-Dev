/**
 * View page actions Component
 */

define([
    'jquery',
    'mage/url',
    'amcformGridDataProvider',
    'removeRecord',
    'editRecord',
    'amcformNotifications'
], function ($, urlBuilder, dataProvider, removeRecord, editRecord, notifications) {
    'use strict';

    $.widget('mage.amRemoveRecord', {
        options: {
            type: null,
            recordId: null
        },
        is_can_resubmit: null,

        /**
         * @inheritDoc
         * @private
         */
        _create: function () {
            var self = this;

            self.getSurveyValue();

            self.element.on('click', function () {
                switch (self.options.type) {
                    case 'edit':
                        editRecord(self.options.recordId, 'view');
                        break;
                    case 'remove':
                        removeRecord(self.options.recordId, self.is_can_resubmit, self.successCallback.bind(self));
                        break;
                    case 'back':
                        self.resetGridCurrentPage();
                        break;
                }
            });
        },

        /**
         * Get isSurveyAvailable from controller
         *
         * @public
         * @return {void}
         */
        getSurveyValue: function () {
            var self = this;

            $.ajax({
                url: urlBuilder.build('amasty_customform/form/survey'),
                dataType: 'json',
                type: 'post',
                data: {'form_id': self.options.recordId},
                success: function (response) {
                    self.is_can_resubmit = response.isSurveyAvailable;
                }
            });
        },

        /**
         * Redirect to the submitted forms grid
         *
         * @public
         * @return {void}
         */
        successCallback: function () {
            this.resetGridCurrentPage();
            notifications().setMessageType('removed', 1);
            window.location.assign(urlBuilder.build('amasty_customform_pro/submittedData'));
        },

        /**
         * Reset Grid to the first page
         *
         * @public
         * @return {void}
         */
        resetGridCurrentPage: function () {
            var provider = dataProvider();

            if (provider) {
                provider.itemStorage.currentPage(1);
                provider.itemStorage.save();
            }
        }
    });

    return $.mage.amRemoveRecord;
});
