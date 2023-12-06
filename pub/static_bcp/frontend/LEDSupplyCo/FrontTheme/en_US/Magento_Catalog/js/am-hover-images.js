/**
 * Hover images widget
 */

define([
    'underscore',
    'jquery',
    'mage/template',
    'Magento_Catalog/js/action/am-hover-image-actions',
    'jquery/jquery.parsequery'
], function (_, $, mageTemplate, amHoverImageActions) {
    'use strict';

    $.widget('am.hoverImages', {
        options: {
            ajaxUrl: null,
            images: [],
            minImagesCount: 2,
            productId: null,
            classes: {
                selectedImage: '-selected',
                imageSelector: 'hover-image',
                withHoverImage: '-with-hover-images',
                attributeClass: 'swatch-attribute'
            },
            selectors: {
                parentElement: '.product-item-info',
                imageBlock: '.product-image-photo',
                imageBlockWrapper: '.product-photo-wrapper',
                dataAttr: 'hover-image'
            },
            hoverImgTemplate: '<% _.each(data.images, function(image) { %>'
                + '<span class="<%- data.class %>" data-<%- data.dataAttr %>="<%- image %>"></span>'
                + '<% }); %>'
        },

        /**
         * Widget initialization
         * @private
         * @returns {void}
         */
        _create: function () {
            this.images = JSON.parse(this.options.images);

            this._initSelectors();

            if (!this._isSwatchElementExist() && this.images.length >= this.options.minImagesCount) {
                this._createImagesTemplate();
            }

            this._initListeners();
        },

        /**
         * @private
         * @returns {Element|null}
         */
        _isSwatchElementExist: function () {
            return this.swatcheElement && this.swatcheElement.length;
        },

        /**
         * Create Images HTML && append to the DOM
         * @private
         * @returns {void}
         */
        _createImagesTemplate: function () {
            this.imagesListTemplate = this._createImagesList();

            if (this.imagesListTemplate.length) {
                this.mainImageWrapper.addClass(this.options.classes.withHoverImage);
                this.element.html(this.imagesListTemplate);
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _initSelectors: function () {
            this.parent = this.element.closest(this.options.selectors.parentElement);
            this.mainImage = this.parent.find(this.options.selectors.imageBlock);
            this.mainImageWrapper = this.parent.find(this.options.selectors.imageBlockWrapper);
            this.swatcheElement = this._getSwatchElement();
        },

        /**
         * @private
         * @returns {void}
         */
        _initListeners: function () {
            this.element.on('mouseover', this.imagesListTemplate, this._updateImages.bind(this));
            this.parent.on('swatchUpdated', this._handleImagesBySwatch.bind(this));
        },

        /**
         * @private
         * @returns {undefined|Element}
         */
        _getSwatchElement: function () {
            var selectedAttributes = $.parseQuery(),
                swatchElement = null;

            $.each(selectedAttributes, $.proxy(function (attributeCode, optionId) {
                swatchElement = this.parent.find('.' + this.options.classes.attributeClass
                    + '[data-attribute-code="' + attributeCode + '"] [data-option-id="' + optionId + '"]');
            }, this));

            return swatchElement;
        },

        /**
         * @private
         * @param {Event} event
         * @param {String|Number} productId
         * @returns {void}
         */
        _handleImagesBySwatch: function (event, productId) {
            var id = productId || this.options.productId;

            amHoverImageActions.getImages(this.options.ajaxUrl, id)
                .success(function (response) {
                    if (_.isArray(response) || !_.has(response, 'error')) {
                        this._handleAjaxSuccessResponse(response);
                    }
                }.bind(this));
        },

        /**
         * @private
         * @param {Object} response
         * @returns {void}
         */
        _handleAjaxSuccessResponse: function (response) {
            _.each(JSON.parse(this.options.images), function (image) {
                response.push(image);
            });

            if (response.length) {
                this.images = _.uniq(response).slice(0, 3);
                this._createImagesTemplate();
            } else {
                this._destroyHoverImagesBlock();
            }
        },

        /**
         * @private
         * @returns {void}
         */
        _destroyHoverImagesBlock: function () {
            this.images = [];
            this.element.html('');
            this.imagesListTemplate = null;
            this.mainImageWrapper.removeClass(this.options.classes.withHoverImage);
        },

        /**
         * @private
         * @returns {*|jQuery|HTMLElement}
         */
        _createImagesList: function () {
            return $(mageTemplate(this.options.hoverImgTemplate, {
                data: {
                    images: this.images,
                    class: this.options.classes.imageSelector,
                    dataAttr: this.options.selectors.dataAttr
                }
            }));
        },

        /**
         * @private
         * @param {Event} event
         * @returns {void}
         */
        _updateImages: function (event) {
            var $target = $(event.target);

            if ($target.hasClass(this.options.classes.selectedImage)) {
                return;
            }

            this.mainImage.attr('src', $target.data(this.options.selectors.dataAttr));
            this.imagesListTemplate.removeClass(this.options.classes.selectedImage);
            $target.addClass(this.options.classes.selectedImage);
        }
    });

    return $.am.hoverImages;
});
