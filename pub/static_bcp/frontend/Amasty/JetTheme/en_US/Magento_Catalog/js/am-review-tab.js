define([
    'jquery',
    'Magento_Review/js/process-reviews'
], function ($, reviewProcessor) {
    'use strict';

    $.widget('am.reviewTab', {
        options: {
            userAgent: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
            productReviewUrl: null,
            classes: {
                active: '-amtheme-active',
                disable: '-amtheme-disable',
                mobile: 'amtheme-ismobile'
            },
            selectors: {
                body: '[data-container="body"]',
                customTabs: '.am-tabs-view',
                productDetailedBlock: '[data-amtheme-js="product-info-detailed"] ',
                buttonToReviews: '[data-amtheme-js="to-all-reviews"]',
                buttonToForm: '[data-amtheme-js="to-review-form"]',
                backButton: '[data-amtheme-js="review-back"]',
                reviewsWrapper: '[data-amtheme-js="reviews"]',
                reviewsAside: '[data-amtheme-js="reviews-aside"]',
                reviewsLoadContainer: '[data-role="product-review"]',
                reviewForm: '.review-add',
                productReviewViewButton: '.product-reviews-summary .action.view',
                reviewsTabTrigger: '[data-amtheme-js="reviews-tab-trigger"]',
                reviewContainer: '#product-review-container'
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _create: function () {
            this._initSelectors();

            if (!this.body.is(this.options.selectors.customTabs)) {
                this._bind();
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _bind: function () {
            if (this.options.userAgent.test(navigator.userAgent)) {
                this._initListeners();
                this.body.addClass(this.options.classes.mobile);
            } else {
                $(this.options.selectors.productReviewViewButton).on('click', this._openReviewsTab.bind(this));
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _initSelectors: function () {
            var selectors = this.options.selectors;

            this.body = $(selectors.body);
            this.reviewsWrapper = $(selectors.productDetailedBlock + selectors.reviewsWrapper);
            this.backButton = $(selectors.backButton);
            this.toFormButton = this.element.find(selectors.buttonToForm);
            this.toAllButton = this.element.find(selectors.buttonToReviews);
            this.reviewsContainer = document.querySelector(selectors.reviewsAside);
            this.reviewForm = document.querySelector(selectors.productDetailedBlock + selectors.reviewForm);
            this.productReviewViewButton = $(selectors.productReviewViewButton);
        },

        /**
         * @private
         * @returns {void}
         */
        _initListeners: function () {
            var self = this;

            if (this.toFormButton) {
                self.toFormButton.on('click', function () {
                    self._showAsideBlock();
                    self.reviewForm.scrollIntoView();
                });
            }

            $(this.options.selectors.reviewContainer).on('contentUpdated', function () {
                self.reviewsContainer.scrollIntoView();
            });

            this._initButtonToReviews();

            this.productReviewViewButton.on('click', this._showReviews.bind(this));

            this.backButton.on('click', this._showAsideBlock.bind(this));
        },

        /**
         * Button To Reviews for Mobile Devices
         *
         * @desc Init review processor initialization trigger 'beforeOpen'
         * for buttonToReviews
         *
         * @private
         * @returns {void}
         */
        _initButtonToReviews: function () {
            reviewProcessor({
                reviewsTabSelector: this.options.selectors.buttonToReviews,
                productReviewUrl: this.options.productReviewUrl
            });

            this.toAllButton.on('click', function (event) {
                event.stopPropagation();
                this._showReviews();

                if (!this.processReviews && $._data(this.toAllButton[0], 'events')) {
                    this.processReviews = $._data(this.toAllButton[0], 'events').beforeOpen[0].handler;
                }

                if (this.processReviews) {
                    this.processReviews(this.options.productReviewUrl);
                }
            }.bind(this));
        },

        /**
         *  Show tab aside block and disable the body if true
         * @private
         * @returns {void}
         */
        _showAsideBlock: function () {
            this.reviewsWrapper.toggleClass(this.options.classes.active);
            this.body.toggleClass(this.options.classes.disable);
        },

        /**
         * Get reviews
         * @param {String} [url]
         * @private
         * @returns {void}
         */
        _processReviews: function (url) {
            var self = this;

            $.ajax({
                url: url,
                cache: true,
                dataType: 'html',
                showLoader: false,
                loaderContext: self.body
            }).done(function (data) {
                $(self.options.selectors.reviewsLoadContainer).html(data).trigger('contentUpdated');
            });
        },

        /**
         *  Open reviews tab
         * @private
         * @returns {void}
         */
        _openReviewsTab: function () {
            $(this.options.selectors.reviewsTabTrigger).trigger('click');
        },

        /**
         *  Show reviews
         * @private
         * @returns {void}
         */
        _showReviews: function () {
            this._showAsideBlock();
            this.reviewsContainer.scrollIntoView();
            this._processReviews(this.options.productReviewUrl);
        }
    });

    return $.am.reviewTab;
});
