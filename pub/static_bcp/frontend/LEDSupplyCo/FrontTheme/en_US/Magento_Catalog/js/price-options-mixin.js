/**
 * price-options mixin
 * Generating prices to amSelect options
 */
define([
    'jquery',
    'underscore',
    'mage/template',
    'priceUtils',
    'priceBox'
], function ($, _, mageTemplate, utils) {
    'use strict';

    var priceOptionsMixin = {
        options: {
            amSelectSelector: '[data-amselect-js="select"]',
            amSelectItemSelector: '[data-amselect-js="item"]',
            amSelectValueAttr: 'data-amselect-value'
        },

        /**
         * @inheritDoc
         */
        _create: function () {
            this._super();

            this._applyCustomSelectNode(this.options.amSelectSelector);
        },

        /**
         * Mostly override the _applyOptionNodeFix method from original file
         * Set prices to custom selects options
         * @param {jQuery} customSelect
         * @private
         * @returns {void}
         */
        _applyCustomSelectNode: function (customSelect) {
            var config = this.options,
                format = config.priceFormat,
                template = config.optionTemplate;

            template = mageTemplate(template);

            $(customSelect, this.element).each(function (index, element) {
                var $element = $(element),
                    optionId = utils.findOptionId($element),
                    optionConfig = (config.optionConfig && config.optionConfig[optionId])
                        || config.optionConfig.options[optionId].selections;

                $element.find(config.amSelectItemSelector).each(function (idx, option) {
                    var $option,
                        optionValue,
                        toTemplate,
                        prices;

                    $option = $(option);
                    optionValue = $option.attr(config.amSelectValueAttr);

                    if (!optionValue && optionValue !== 0) {
                        return;
                    }

                    toTemplate = {
                        data: {
                            label: optionConfig[optionValue] && optionConfig[optionValue].name
                        }
                    };
                    prices = optionConfig[optionValue] ? optionConfig[optionValue].prices : null;

                    if (prices) {
                        _.each(prices, function (price, type) {
                            var value = +price.amount;

                            value += _.reduce(price.adjustments, function (sum, x) { //eslint-disable-line
                                return sum + x;
                            }, 0);
                            toTemplate.data[type] = {
                                value: value,
                                formatted: utils.formatPrice(value, format)
                            };
                        });

                        $option.text(template(toTemplate));
                    }
                });
            });
        }
    };

    return function (targetWidget) {
        $.widget('mage.priceOptions', targetWidget, priceOptionsMixin);

        return $.mage.priceOptions;
    };
});
