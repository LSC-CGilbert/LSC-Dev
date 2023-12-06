/**
 * Grid Component
 */

define([
    'jquery',
    'ko',
    'uiComponent',
    'rjsResolver',
    'amcformGridDataProvider'
], function ($, ko, Component, resolver, dataProvider) {
    'use strict';

    return Component.extend({
        defaults: {
            modules: {
                pager: 'grid_pager'
            }
        },
        provider: null,

        /**
         * Initializes component
         */
        initialize: function () {
            var self = this;

            self._super();

            resolver(function () {
                self.provider = dataProvider();

                self.provider.result.subscribe(function (value) {
                    self.elems(value.items);
                    self.searchCriteria(value.search_criteria);
                });

                self.pager().isLoaded.subscribe(function (value) {
                    self.isLoaded(value);
                });
            });
        },

        /**
         * Init observable variables
         *
         * @return {Object}
         */
        initObservable: function () {
            this._super()
                .observe({
                    elems: [],
                    formsCount: [],
                    searchCriteria: [],
                    itemId: 0,
                    isLoaded: false,
                    isError: false
                });

            return this;
        }
    });
});
