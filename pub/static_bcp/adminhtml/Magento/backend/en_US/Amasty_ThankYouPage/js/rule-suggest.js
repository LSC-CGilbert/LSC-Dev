define([
    'jquery',
    'mage/backend/suggest'
], function ($) {
    'use strict';

    $.widget('mage.ruleSuggest', {
        options: {
            htmlId: '',
            ruleName: '',
            noteSelector: '.note',
            removeSelector: '.action.delete',
            widgetOptions: {},
            selectors: {
                suggestedRule: '-suggest',
                selectedRule: '-selected'
            }
        },

        /** @inheritDoc */
        _create: function () {
            this._initSelectors();
            this._setNotePosition();
            this._initAjaxAction();
            this._initRemoveRuleAction();
        },

        /**
         * Init selectors from template
         * @private
         * @returns {void}
         */
        _initSelectors: function () {
            this.selectors = this.options.selectors;
            this.formInput = $(this.options.htmlId);
            this.suggestedContainer = $(this.options.htmlId + this.selectors.suggestedRule);
            this.selectedContainer = $(this.options.htmlId + this.selectors.selectedRule);
            this.removeButton = this.selectedContainer.find(this.options.removeSelector);
            this.ruleNameContainer = this.selectedContainer.find(this.options.ruleName);
            this.noteContainer = this.element.parent().find(this.options.noteSelector);
        },

        /**
         * @private
         * @returns {mage.ruleSuggest}
         */
        _setNotePosition: function () {
            this.selectedContainer.insertAfter(this.noteContainer);

            return this;
        },

        /**
         * @private
         * @returns {void}
         */
        _initAjaxAction: function () {
            var _self = this,
                widgetOptions = JSON.parse(this.options.widgetOptions);

            this.suggestedContainer
                .suggest(widgetOptions)
                .on('suggestselect', function (e, ui) {
                    if (ui.item.id) {
                        _self.ruleNameContainer.text('#' + ui.item.id + ' - ' + ui.item.label);
                        _self.selectedContainer.show();
                        _self.suggestedContainer.val('');
                    } else {
                        _self.selectedContainer.hide();
                    }
                })
                .on('blur', function () {
                    _self.suggestedContainer.val('');
                });
        },

        /**
         * @private
         * @returns {void}
         */
        _initRemoveRuleAction: function () {
            this.removeButton.on('click', function(e) {
                e.preventDefault();

                this.selectedContainer.hide();
                this.formInput.val('');
            }.bind(this));
        }
    });

    return $.mage.ruleSuggest;
});
