/**
 * Grid Actions Component
 */

define([
    'jquery',
    'uiComponent',
    'rjsResolver',
    'ko',
    'underscore',
    'mage/url',
    'amcformGridDataProvider',
    'removeRecord',
    'editRecord',
    'amcformNotifications'
], function (
    $,
    Component,
    resolver,
    ko,
    _,
    urlBuilder,
    dataProvider,
    removeRecord,
    editRecord,
    notifications
) {
    'use strict';

    return Component.extend({
        defaults: {
            modules: {
                pager: 'grid_pager'
            },
            links: {
                currentPage: 'index = grid_pager:currentPage',
                pageSize: 'index = grid_pager:pageSize'
            }
        },

        /**
         * Initializes component
         */
        initialize: function () {
            this._super();
            this.provider = dataProvider();
        },

        /**
         * @param {string} action
         * @param {number} id
         * @param {boolean} is_can_resubmit
         * @return {void}
         */
        actionClickEvent: function (action, id, is_can_resubmit) {
            switch (action) {
                case 'remove':
                    removeRecord(id, is_can_resubmit, this.removeItemCallback.bind(this, id));
                    break;
                case 'view':
                    this.viewRecord(urlBuilder.build(this.provider.getElementById(id).view_url));
                    break;
                case 'edit':
                    editRecord(id, 'grid');
                    break;
            }
        },

        /**
         * @param {number} id
         * @return {void}
         */
        removeItemCallback: function (id) {
            var self = this;

            self.provider.formsCount(function () {
                return self.provider.formsCount().filter(function (obj) {
                    return obj.id !== id;
                });
            }());

            self.provider.getForms(self.currentPage, self.pageSize);

            notifications().setMessageType('removed', 1);
            notifications('showSuccessMessage');
        },

        /**
         * Action to view record
         *
         * @param {string} url
         * @return {void}
         */
        viewRecord: function (url) {
            window.location.assign(url);
        }
    });
});
