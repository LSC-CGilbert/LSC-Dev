/*
 * Swatch renderer mixin
 */
define([
    'jquery',
    'underscore'
], function ($, _) {
    'use strict';

    return function (SwatchRenderer) {
        $.widget('mage.SwatchRenderer', SwatchRenderer, {

            /**
             * Moving product options (swatches) on product grid -> Override product data method
             * @returns {{isInProductView: boolean, productId: (undefined|String)}}
             * @private
             */
            _determineProductData: function () {
                var productId,
                    isInProductView = false;

                productId = this.element.parents('.product-item-info')
                    .find('.price-box.price-final_price').attr('data-product-id');

                if (!productId) {
                    productId = $('[name=product]').val();
                    isInProductView = productId > 0;
                }

                return {
                    productId: productId,
                    isInProductView: isInProductView
                };
            },

            /**
             * Adding css modifiers for old price and special price
             * @inheritDoc
             */
            _UpdatePrice: function () {
                var $widget = this,
                    $product = $widget.element.parents($widget.options.selectorProduct),
                    priceBox = $product.find(this.options.selectorProductPrice),
                    options,
                    result,
                    isShow;

                if ($widget._getNewPrices) { // Magento 2.3.0 compatibility
                    result = $widget._getNewPrices();
                } else {
                    options = _.object(_.keys($widget.optionsMap), {});

                    $widget.element
                        .find('.' + $widget.options.classes.attributeClass + '[option-selected]')
                        .each(function () {
                            var attributeId = $(this).attr('attribute-id');

                            options[attributeId] = $(this).attr('option-selected');
                        });

                    result = $widget.options.jsonConfig.optionPrices[_.findKey(
                        $widget.options.jsonConfig.index,
                        options
                    )];
                }

                this._super();

                // Override Magento
                isShow = typeof result != 'undefined' && result.oldPrice.amount !== result.finalPrice.amount;

                // Adding modifier for special price in product
                priceBox.toggleClass('-am-special-price', isShow);

                // Adding modifier when price label is hidden
                priceBox.addClass('-am-no-price-label');

                // Extend Magento
                _.each($product.find('.' + this.options.classes.attributeOptionsWrapper), function (attribute) {
                    if ($(attribute).find('.' + this.options.classes.optionClass + '.selected').length === 0) {
                        if ($(attribute).find('.' + this.options.classes.selectClass).length > 0) {
                            _.each($(attribute).find('.' + this.options.classes.selectClass), function (dropdown) {
                                if ($(dropdown).val() === '0') {
                                    // Removing modifier when price label is shown
                                    priceBox.removeClass('-am-no-price-label');
                                }
                            });
                        } else {
                            // Removing modifier when price label is shown
                            priceBox.removeClass('-am-no-price-label');
                        }
                    }
                }.bind(this));
            },

            /** @inheritDoc */
            updateBaseImage: function (images, context, isInProductView) {
                var justAnImage = images[0],
                    initialImages = this.options.mediaGalleryInitial,
                    imagesToUpdate,
                    gallery = context.find(this.options.mediaGallerySelector).data('gallery'),
                    isInitial;

                if (isInProductView) {
                    imagesToUpdate = images.length ? this._setImageType($.extend(true, [], images)) : [];
                    isInitial = _.isEqual(imagesToUpdate, initialImages);

                    if (_.isUndefined(gallery)) {
                        context.find(this.options.mediaGallerySelector).on('gallery:loaded', function () {
                            this.updateBaseImage(images, context, isInProductView);
                        }.bind(this));

                        return;
                    }

                    if (this.options.gallerySwitchStrategy === 'prepend' && !isInitial) {
                        imagesToUpdate = imagesToUpdate.concat(initialImages);
                    }

                    imagesToUpdate = this._setImageIndex(imagesToUpdate);

                    if (!_.isUndefined(gallery)) {
                        gallery.updateData(imagesToUpdate);
                    } else {
                        context.find(this.options.mediaGallerySelector).on('gallery:loaded', function (loadedGallery) {
                            // eslint-disable-next-line no-param-reassign
                            loadedGallery = context.find(this.options.mediaGallerySelector).data('gallery');
                            loadedGallery.updateData(imagesToUpdate);
                        }.bind(this));
                    }

                    if ($(this.options.mediaGallerySelector).AddFotoramaVideoEvents) {
                        // eslint-disable-next-line max-depth
                        if (isInitial) {
                            $(this.options.mediaGallerySelector).AddFotoramaVideoEvents();
                        } else {
                            $(this.options.mediaGallerySelector).AddFotoramaVideoEvents({
                                selectedOption: this.getProduct(),
                                dataMergeStrategy: this.options.gallerySwitchStrategy
                            });
                        }
                    }

                    // eslint-disable-next-line
                    if (gallery && $.type(gallery.first) === 'function') {
                        gallery.first();
                    }
                } else if (justAnImage && justAnImage.img) {
                    context.find('.product-image-photo').attr('src', justAnImage.img);
                }
            },

            /** @inheritDoc */
            _ProductMediaCallback: function ($this, response, isInProductView) {
                var productItem = this.element.parents('.product-item-info');

                this._super($this, response, isInProductView);

                if (productItem.length) {
                    productItem.trigger('swatchUpdated', this.getProduct());
                }

                return this;
            }
        });

        return $.mage.SwatchRenderer;
    };
});
