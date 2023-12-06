/**
 *  Magento gallery mixin for set max-height of gallery
 *  and set fixed height for vertical thumbnail
 */

define([
    'underscore'
], function (_) {
    'use strict';

    return function (gallery) {
        return gallery.extend({
            defaults: {
                selectors: {
                    galleryContainer: '[data-gallery-role="gallery"]',
                    galleryPlaceholderImage: '.gallery-placeholder__image',
                    fotoramaStage: '.fotorama__stage',
                    fotoramaStageFrame: '.fotorama__stage__frame',
                    activeStageFrame: '.fotorama__stage__frame.fotorama__active'
                },
                classes: {
                    loadingClass: '_block-content-loading'
                }
            },

            initialize: function (config) {
                if (_.has(config, 'amGalleryConfig')) {
                    this._getThumbsPosition(config);
                }

                this._super();
            },

            initGallery: function () {
                var $element = this.settings.$element,
                    $fotoramaElement,
                    $fotoramaStage;

                this._super();

                if (!$element.find(this.activeStageFrame).length) {
                    $fotoramaElement = $element.find(this.selectors.galleryContainer);
                    $fotoramaStage = $fotoramaElement.find(this.selectors.fotoramaStage);

                    $fotoramaElement.find(this.selectors.fotoramaStageFrame).first().one('f:load', function () {
                        $element.find(this.selectors.galleryPlaceholderImage).remove();
                        $element
                            .removeClass(this.classes.loadingClass)
                            .css('min-height', '');

                        $fotoramaStage.css('position', '');
                    }.bind(this));
                }
            },

            /**
             * Update thumbs position base on provided config
             * @param {Object} config
             * @returns {Object}
             * @private
             */
            _getThumbsPosition: function (config) {
                var amGalleryPosition = _.has(config.amGalleryConfig, 'position')
                    ? config.amGalleryConfig.position
                    : '';

                if (amGalleryPosition) {
                    config.options.navposition = amGalleryPosition;
                }

                if (amGalleryPosition === 'bottom') {
                    config.options.navdir = 'horizontal';
                    config.fullscreen.navdir = 'horizontal';
                    config.options.navwidth = '80%';
                } else {
                    config.options.maxheight = config.options.height;
                    config.options.navdir = 'vertical';
                    config.fullscreen.navdir = 'vertical';
                }

                return config;
            }
        });
    };
});
