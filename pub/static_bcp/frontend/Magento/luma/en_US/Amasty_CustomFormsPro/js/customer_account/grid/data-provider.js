/**
 * Data Provider Component
 */

define([
    'jquery',
    'ko',
    'uiCollection',
    'mage/url'
], function ($, ko, Collection, urlBuilder) {
    'use strict';

    return Collection.extend({
        defaults: {
            gridItemsUrl: 'rest/V1/amasty_customform_pro/submitted_data/grid_items',
            baseUrl: window.BASE_URL,
            itemStorage: {
                pageSize: ko.observable(5),
                currentPage: ko.observable(1),
                init: function () {
                    var storage = this.get();

                    if (storage) {
                        this.pageSize(storage.pageSize);
                        this.currentPage(storage.currentPage);
                    }
                },
                get: function () {
                    return JSON.parse(localStorage.getItem('amasty_customform_pro_storage'));
                },
                save: function () {
                    var data = {
                        'pageSize': this.pageSize,
                        'currentPage': this.currentPage,
                    };

                    localStorage.setItem('amasty_customform_pro_storage', ko.toJSON(data));
                },
            },
            modules: {
                pager: 'grid_pager',
                grid: 'submittedDataGrid'
            },
            links: {
                isLoaded: 'index = grid_pager:isLoaded'
            }
        },
        formsCount: ko.observableArray([]),
        result: ko.observableArray([]),

        /**
         * Initializes component
         */
        initialize: function () {
            this._super();

            urlBuilder.setBaseUrl(this.baseUrl);
        },

        /**
         * Get All forms data
         * @public
         * @return {void}
         */
        getFormsCount: function () {
            this.loadData(1);
        },

        /**
         * Get forms data based on page and page size
         *
         * @public
         * @return {void}
         */
        getForms: function (page, size) {
            this.loadData(page, size);
        },

        /**
         * Get Grid Element by id
         *
         * @public
         * @param {Number} id
         * @return {Object|null}
         */
        getElementById: function (id) {
            var result = null;

            id = +id;

            this.formsCount().some(function (element) {
               if (element.id === id) {
                   result = element;
               }

               return result !== null;
            });

            return result;
        },

        /**
         * load and set data to component
         *
         * @return {Object}
         */
        loadData: function (page, size) {
            var self = this;

            return $.ajax({
                url: urlBuilder.build(self.gridItemsUrl),
                type: 'GET',
                showLoader: true,
                data: {
                    searchCriteria: {
                        currentPage: page,
                        pageSize: size
                    }
                },
                error: function (result) {
                    console.error(result.responseJSON.message);
                    self.grid().isError(true);
                },
                success: function (result) {
                    if (size) {
                        self.result(result);
                    } else {
                        self.formsCount(result.items);
                    }
                }
            });
        }
    });
});
