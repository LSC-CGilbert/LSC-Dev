/**
 * Grid Pager Component
 */

define([
    'jquery',
    'uiComponent',
    'rjsResolver',
    'ko',
    'underscore',
    'amcformGridDataProvider'
], function ($, Component, resolver, ko, _, dataProvider) {
    'use strict';

    return Component.extend({
        defaults: {
            modules: {
                grid: 'submittedDataGrid'
            },
            links: {
                elems: 'index = submittedDataGrid:elems',
            }
        },

        /**
         * Init observable variables
         * @return {object}
         */
        initObservable: function () {
            this._super()
                .observe({
                    currentPage: 1,
                    pageSize: 1,
                    isPaginationVisible: false,
                    isEmptyContent: false,
                    isLoaded: false,
                    elems: 0,
                    formsCount: [],
                    pagesToDisplay: []
                });

            return this;
        },

        /**
         * Initializes component
         */
        initialize: function () {
            var self = this;

            self._super();

            resolver(function () {
                self.provider = dataProvider();

                self.provider.itemStorage.init();
                self.provider.itemStorage.save();
                self.provider.getFormsCount();

                self.provider.formsCount.subscribe(self.onFormsCountChange.bind(self));
                self.pageSize.subscribe(self.onPageSizeChange.bind(self));
                self.currentPage.subscribe(self.onCurrentPageChange.bind(self));
                self.provider.result.subscribe(self.onResultChange.bind(self));
            });
        },

        /**
         * @param {string} value
         */
        onFormsCountChange: function (value) {
            this.formsCount(value);
            this.pageSize(this.provider.itemStorage.get().pageSize);
            this.currentPage(this.provider.itemStorage.get().currentPage);
            this.provider.getForms(this.currentPage(), this.pageSize());
        },

        /**
         * @param {string} value
         */
        onPageSizeChange: function (value) {
            if (this.currentPage() === value) {
                return;
            }

            this.provider.getForms(1, value);
            this.savePageSize(value);
            this.resetCurrentPage();
        },

        /**
         * @param {string} value
         */
        onCurrentPageChange: function (value) {
            if (this.pageSize() === value) {
                return;
            }

            this.provider.getForms(value, this.pageSize());
            this.saveCurrentPage(value);
        },

        /**
         * @param {string} value
         */
        onResultChange: function (value) {
            this._updateDisplayedPages();
            this.isPaginationVisible(this.getLastPage() > 1);

            if (!value.total_count && this.currentPage() > 1) {
                this.setCurrentPage(this.currentPage() - 1);
            }

            this.isEmptyContent(Boolean(!this.elems().length));
            this.isLoaded(true);
        },

        /**
         * Save page size to local storage
         * @param {string} value
         */
        savePageSize: function (value) {
            this.provider.itemStorage.pageSize(value.toString());
            this.provider.itemStorage.save();
        },

        /**
         * Save current page to local storage
         * @param {string} value
         */
        saveCurrentPage: function (value) {
            this.provider.itemStorage.currentPage(value);
            this.provider.itemStorage.save();
        },

        /**
         * Reset current page and save it to local storage
         */
        resetCurrentPage: function () {
            this.provider.itemStorage.currentPage(1);
            this.currentPage(1);
            this.provider.itemStorage.save();
        },

        /**
         * Change current page
         * @param {number} targetPage
         */
        setCurrentPage: function (targetPage) {
            if (targetPage < 1) {
                targetPage = 1;
            } else if (targetPage > this.getLastPage()) {
                targetPage = this.getLastPage();
            }

            this.currentPage(targetPage);
        },

        /**
         * Retrieve last page.
         * @return {number}
         */
        getLastPage: function () {
            var count = this.formsCount();

            if (count && count.length) {
                return this._calculatePage(count.length);
            }
        },

        /**
         * Calculate page for position.
         * @param {number} position
         * @return {number}
         * @private
         */
        _calculatePage: function (position) {
            var page;

            if (position <= 0) {
                page = 1;
            } else {
                page = Math.ceil(position / this.pageSize());
            }

            return page;
        },

        /**
         * Update array with displayed pages
         * 0 - determine element, which render as '...' in pages list
         * @private
         * @return {void}
         */
        _updateDisplayedPages: function () {
            var pagesToDisplay = [],
                lastPage = this.getLastPage(),
                maxPagesToDisplay = 5;

            if (lastPage <= maxPagesToDisplay) {
                pagesToDisplay = _.range(1, lastPage + 1);
            } else {
                pagesToDisplay.push(1);
                if (this.currentPage() <= 2) {
                    pagesToDisplay.push(2);
                    pagesToDisplay.push(3);
                } else {
                    pagesToDisplay.push(0);
                }
                if (this.currentPage() >= lastPage - 1) {
                    pagesToDisplay.push(lastPage - 2);
                    pagesToDisplay.push(lastPage - 1);
                } else {
                    if (this.currentPage() > 2) {
                        pagesToDisplay.push(this.currentPage());
                    }
                    if (this.currentPage() < lastPage - 1) {
                        pagesToDisplay.push(0);
                    }
                }
                pagesToDisplay.push(lastPage);
            }

            this.pagesToDisplay(pagesToDisplay);
        },

        /**
         * Get title for element in pages list.
         * @param {number} index
         * @returns {string}
         */
        getPageTitle: function (index) {
            return index ? index : '...';
        },

        /**
         * Detect current page.
         * @param {number} index
         * @returns {boolean}
         */
        isCurrentPage: function (index) {
            return this.currentPage() === index;
        }
    });
});
