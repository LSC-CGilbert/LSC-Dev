define([
    'jquery',
    'ko',
    'underscore',
    'uiElement',
    'Amasty_JetTheme/js/model/colors-config',
    'jquery/colorpicker/js/colorpicker',
    'domReady!'
], function ($, ko, _, Element, colorsModel) {
    'use strict';

    return Element.extend({
        defaults: {
            ignoreTmpl: {
                templates: false
            },
            inputUiElement: null,
            isInputInitialized: false,
            isNewColorApplied: false,
            fieldId: null,
            listens: {
                value: 'setColor _highlightRow',
                isInputInitialized: 'setColor initializeColorPicker _highlightRow',
                isSetToInitial: 'resetColorToInitial',
                isNewColorApplied: 'toggleIsDefaultValue'
            },
            isSetToInitial: colorsModel.isResetColor,
            htmlId: null,
            cachedValue: '',
            classes: {
                selectedRow: 'amtheme-selected-row'
            }
        },

        /** @inheritDoc  */
        initialize: function () {
            this._super();

            colorsModel.colorsConfig.subscribe(function (data) {
                if (data && _.has(data, this.fieldId)) {
                    this.value(data[this.fieldId]);
                    this.isNewColorApplied(true);
                    this.value.valueHasMutated();
                }
            }.bind(this));

            $.async({
                selector: '#' + this.htmlId
            }, function (element) {
                this.inputUiElement = $(element);
                this.cachedValue = this.value();
                this.getIsDefaultValue();
                this.isInputInitialized(true);
            }.bind(this));

            return this;
        },

        /**
         * @returns {void}
         */
        getIsDefaultValue: function () {
            this.useDefaultElement = $('#row_' + this.htmlId).find('#' + this.htmlId + '_inherit');

            if (this.useDefaultElement.length) {
                this.useDefaultValue = this.useDefaultElement.is(':checked');
            }
        },

        /**
         * @returns {void}
         */
        resetColorToInitial: function (data) {
            if (data) {
                this.value(this.cachedValue);
                this.isNewColorApplied(false);
            }
        },

        /**
         * @returns {void}
         */
        toggleIsDefaultValue: function () {
            if (!this.useDefaultElement.length) {
                return;
            }

            if (this.isNewColorApplied() && this.useDefaultElement.is(':checked')) {
                this.useDefaultElement.trigger('click');

                return;
            }

            if (!this.isNewColorApplied() && this.useDefaultElement.is(':checked') !== this.useDefaultValue) {
                this.useDefaultElement.trigger('click');
            }
        },

        /** @inheritDoc */
        initObservable: function () {
            this._super()
                .observe(['value', 'isInputInitialized', 'isNewColorApplied']);

            return this;
        },

        /**
         * @param {String} color
         * @returns {string}
         */
        inverseColor: function (color) {
            return (0xFFFFFF - ('0x' + color)).toString(16)
                .padStart(6, '0')
                .toUpperCase();
        },

        initializeColorPicker: function () {
            _.debounce(function () {
                this.inputUiElement.ColorPicker({
                    color: this.value(),
                    onChange: function (hsb, hex) {
                        this.inputUiElement.css({
                            backgroundColor: '#' + hex,
                            color: '#' + this.inverseColor(hex)
                        }).val('#' + hex);
                    }.bind(this)
                });
            }.bind(this), 300)();
        },

        setColor: function () {
            this.inputUiElement.css({
                backgroundColor: this.value(),
                color: this.inverseHex
            }).val(this.value());

        },

        /**
         * Add additional class on parent element to highlight changes
         * @private
         * @returns {void}
         */
        _highlightRow: function () {
            var parentRow = this.inputUiElement.parents('#row_' + this.htmlId),
                parentSection = this.inputUiElement.parents('.section-config'),
                $headerElement = parentSection.find('.entry-edit-head');

            if (this.cachedValue !== '' && this.cachedValue !== this.value()) {
                parentRow.addClass(this.classes.selectedRow);
                parentSection.addClass('active');
                $headerElement.find('> a').addClass('open');
                parentSection.find('.admin__collapsible-block').show();
            } else {
                parentRow.removeClass(this.classes.selectedRow);
            }
        }
    });
});
