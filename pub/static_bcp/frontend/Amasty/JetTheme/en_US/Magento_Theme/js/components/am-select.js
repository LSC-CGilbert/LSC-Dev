/**
 * Default Select Module logic
 * @return widget
 */

define([
    'jquery',
    'underscore'
], function ($, _) {
    'use strict';

    $.widget('mage.amSelect', {
        options: {
            selectId: null,
            selectType: null,
            optionsIds: [],
            delay: 150,
            hrefTargetEngine: false,
            classes: {
                active: '-active',
                selected: '-selected',
                multiple: '-multiple'
            },
            selectors: {
                selectWrapper: '[data-amselect-js="select"]',
                optionsList: '[data-amselect-js="options"]',
                placeholder: '[data-amselect-js="placeholder"]',
                placeholderContent: '[data-amselect-js="placeholder-content"]',
                tagsList: '[data-amselect-js="tags"]',
                optionItem: '[data-amselect-js="item"]',
                tagTargetOption: '[data-amselect-value="%"]',
                targetPage: '[data-amselect-js="target"]'
            },
            vendorJsAttribute: 'data-amselect-js',
            vendorValueAttribute: 'data-amselect-value',
            vendorTargetAttribute: 'data-amselect-target'
        },

        keycodes: {
            SPACEBAR: [0, 32],
            ENTER: 13,
            ARROW_DOWN: 40,
            ARROW_UP: 38,
            ESCAPE: 27
        },

        nodes: {
            closeButton: $('<button>', {
                class: 'amtheme-delete-button',
                type: 'button',
                tabindex: '0',
                text: 'delete',
                title: 'delete',
                'aria-label': 'delete'
            }),
            tagsBlock: $('<ul>', { class: 'amtheme-tags-block', 'data-amselect-js': 'tags' })
        },

        /**
         * @private
         * @returns {void}
         */
        _create: function () {
            this._initMultipleType();
            this._initSelectors();
            this._initListeners();
            this._getOptionsIds();
            this._setSelectedOptionOnload();
            this._setDropdownWidth();
        },

        /**
         * @private
         * @returns {void}
         */
        _initSelectors: function () {
            var self = this,
                selectors = self.options.selectors;

            this.document = $(document);
            this.selectBlockSource = $('#' + this.options.selectId);
            this.placeholderBlock = this.element.find(selectors.placeholder);
            this.placeholderContentBlock = this.element.find(selectors.placeholderContent);
            this.optionsSelectorBlock = this.element.find(selectors.optionsList);
            this.optionItemBlock = this.optionsSelectorBlock.find(selectors.optionItem);
            this.tagsBlock = this.element.next(selectors.tagsList);
        },

        /**
         * @private
         * @returns {void}
         */
        _initListeners: function () {
            var self = this;

            this.placeholderBlock.on('click', function () {
                if (self.isMultiple) {
                    self._toggleOptionsList(!self.element.hasClass(self.options.classes.active));
                } else {
                    self._toggleOptionsList();
                }
            });

            this.optionsSelectorBlock.on('click', function (event) {
                if (event.target.hasAttribute('disabled')) {
                    return;
                }

                if (self.isMultiple) {
                    self._multiSelectOptionToggle(this, event);
                    self._changeSelect(self.element);
                    self._generateTag(self.element);
                } else if (self.options.hrefTargetEngine) {
                    self._selectOption(this, event);
                    self._proceedToTargetPage(this, event);
                } else {
                    self._selectOption(this, event);
                    self._toggleOptionsList(false);
                }
            });

            this.tagsBlock.on('click', function (event) {
                if (event.target.type === 'button') {
                    self._removeTag(event.target.parentNode);
                }
            });

            this.document.on('click', function (event) {
                self._hideGlobal(event);
            });

            this.placeholderBlock.on('keydown', function (event) {
                self._keysEvents(event);
            });

            this.element.on('keydown', function (event) {
                self._selectByKey(event);
            });

            this.optionItemBlock.on('keydown', function (event) {
                switch (event.keyCode) {
                    case self.keycodes.ENTER:
                        if (event.target.hasAttribute('disabled')) {
                            return;
                        }

                        if (self.isMultiple) {
                            self._multiSelectOptionToggle(self.optionsSelectorBlock, event);
                            self._changeSelect(self.element);
                            self._generateTag(self.element);
                        } else {
                            self._selectOption(self.optionsSelectorBlock, event);
                        }

                        return;
                    case self.keycodes.ARROW_DOWN:
                    case self.keycodes.ARROW_UP:
                        self._focusNextListItem(event.keyCode);

                        return;
                    case self.keycodes.ESCAPE:
                        self._toggleOptionsList(false);
                        break;
                    default:
                        break;
                }
            });

            this.selectBlockSource.on('change', function () {
                self._setSelectedOptionOnload();
            });

            $(window).on('resize', _.debounce(this._setDropdownWidth.bind(this), this.delay));
        },

        /**
         * Used for select dropdowns with links as options. I.g. limiter on 'My Orders' page in account
         *
         * @param {Object} [element]
         * @param {Object} [event]
         * @private
         * @returns {mage.amSelect}
         */
        _proceedToTargetPage: function (element, event) {
            window.location.href = $(element).find(event.target)
                .find(this.options.selectors.targetPage)
                .attr(this.options.vendorTargetAttribute);

            return this;
        },

        /**
         * Added class to select block. Append tags container to the multiple select block
         *
         * @private
         * @returns {void}
         */
        _initMultipleType: function () {
            this.isMultiple = this.options.selectType === 'multiple';
            this.element.toggleClass(this.options.classes.multiple, this.isMultiple)
                .after(this.nodes.tagsBlock.clone());
        },

        /**
         * Declare optionsItems as array. Push ids to optionsIds array
         *
         * @private
         * @returns {void}
         */
        _getOptionsIds: function () {
            var self = this;

            this.selectOptions = this.optionItemBlock.toArray();

            this.selectOptions.forEach(function (item) {
                self.options.optionsIds.push(item.dataset.amselectValue);
            });
        },

        /**
         * Set selected option onload
         *
         * @private
         * @returns {void}
         */
        _setSelectedOptionOnload: function () {
            var selectedOption,
                selectValue,
                selectFiltered = this.optionItemBlock.filter('[selected]');

            if (selectFiltered.length || this.isMultiple) {
                selectedOption = selectFiltered;
            } else {
                selectValue = $('#' + this.options.selectId).val();

                if (selectValue) {
                    selectedOption = this.optionsSelectorBlock.find('[data-amselect-value=' + selectValue + ']');
                } else {
                    return;
                }
            }

            if (selectedOption) {
                selectedOption.addClass(this.options.classes.selected).removeAttr('selected');
            }

            if (this.isMultiple) {
                this._generateTag(this.element);
            } else {
                this.placeholderBlock.addClass(this.options.classes.selected);
                this.placeholderContentBlock.html(selectedOption.html());
            }
        },

        /**
         * Toggle select options, using _changeSelect method to set a value into an origin select
         *
         * @param {Object} [element]
         * @param {Object} [event]
         * @private
         * @returns {void}
         */
        _selectOption: function (element, event) {
            var options = this.options,
                targetElement = $(element).find(event.target),
                isValueAttr = !!targetElement.attr(options.vendorValueAttribute);

            $(element).children().not(event.target).removeClass(options.classes.selected);
            targetElement.addClass(options.classes.selected);
            this.placeholderBlock.toggleClass(options.classes.selected, isValueAttr);
            this.placeholderContentBlock.html(targetElement.html());
            this._setDropdownWidth();
            this._changeSelect($(element));
        },

        /**
         * Toggle selected class of the multiSelect options
         *
         * @param {Object} [element]
         * @param {Object} [event]
         * @private
         * @returns {void}
         */
        _multiSelectOptionToggle: function (element, event) {
            $(element).find(event.target).toggleClass(this.options.classes.selected);
        },

        /**
         * Set an option value into the origin select
         *
         * @param {Object} [element]
         * @private
         * @returns {void}
         */
        _changeSelect: function (element) {
            this.selectBlockSource
                .val(this.getValue(element.find('.' + this.options.classes.selected)))
                .trigger('change');
        },

        /**
         * Toggle element active class
         *
         * @param {Boolean} [state]
         * @private
         * @returns {void}
         */
        _toggleOptionsList: function (state) {
            this.element.toggleClass(this.options.classes.active, state);
        },

        /**
         * Check what key is pressed
         *
         * @param {Object} [event]
         * @private
         * @returns {void}
         */
        _keysEvents: function (event) {
            var self = this;

            switch (event.keyCode) {
                case self.keycodes.ENTER:
                    self._toggleOptionsList(true);

                    return;
                case self.keycodes.ESCAPE:
                    self._toggleOptionsList(false);

                    return;
                case self.keycodes.ARROW_DOWN:
                case self.keycodes.ARROW_UP:
                    self._focusNextListItem(event.keyCode);

                    break;
                default:
                    break;
            }
        },

        /**
         * @private
         * @param {Event} event
         * @returns {void}
         */
        _selectByKey: function (event) {
            var item;

            if (_.has(event, 'originalEvent') && event.originalEvent.code !== event.originalEvent.key) {
                item = this.getOptionByCodeKey(event.key);
            }

            if (item && !_.isUndefined(item)) {
                item.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
                item.focus();
            }
        },

        /**
         *
         * @param {String} key
         * @returns {Object|undefined}
         */
        getOptionByCodeKey: function (key) {
            var options = this.element.find(this.options.selectors.optionItem);

            return _.find(options, function (element) {
                var $element = $(element),
                    text = $element.text().toLowerCase();

                return $element[0].hasAttribute(this.options.vendorValueAttribute)
                    && text.charAt(0) === key.toLowerCase();
            }.bind(this));
        },

        /**
         * Apply focus to the next, prev or first option item
         *
         * @param {Number} [direction]
         * @private
         * @returns {void}
         */
        _focusNextListItem: function (direction) {
            var items = this.selectOptions,
                vendorJsAttribute = this.options.vendorJsAttribute,
                activeElement = $(document.activeElement),
                currentElementIndex = items.indexOf(activeElement[0]);

            if (activeElement.attr(vendorJsAttribute) === this.placeholderBlock.attr(vendorJsAttribute)) {
                this.optionItemBlock.first().focus();
            } else {
                if (direction === this.keycodes.ARROW_DOWN && currentElementIndex < items.length - 1) {
                    items[currentElementIndex + 1].focus();
                }

                if (direction === this.keycodes.ARROW_UP && currentElementIndex > 0) {
                    items[currentElementIndex - 1].focus();
                }
            }
        },

        /**
         * Clone selected options and make them as tags
         *
         * @param {Object} [element]
         * @private
         * @returns {void}
         */
        _generateTag: function (element) {
            var self = this;

            this._clearHtml(this.tagsBlock);

            element.find('.' + this.options.classes.selected).each(function () {
                self.tagsBlock.append($(this).clone().attr('tabindex', '0').append(self.nodes.closeButton.clone()));
            });
        },

        /**
         * Remove tag by value from DOM and trigger changeSelect method
         *
         * @param {Object} [element]
         * @private
         * @returns {void}
         */
        _removeTag: function (element) {
            var targetOption = this.options.selectors.tagTargetOption.replace('%', element.dataset.amselectValue);

            this.element.find(targetOption).removeClass(this.options.classes.selected);
            this._changeSelect(this.element);
            $(element).remove();
        },

        /**
         * Clear element inner html
         *
         * @param {Object} [element]
         * @private
         * @returns {void}
         */
        _clearHtml: function (element) {
            element.html('');
        },

        /**
         * Remove active class from all elements except the target element
         *
         * @param {Object} [event]
         * @private
         * @returns {void}
         */
        _hideGlobal: function (event) {
            this.element.not($(event.target)
                .closest(this.options.selectors.selectWrapper))
                .removeClass(this.options.classes.active);
        },

        /**
         * Set Options List min-width based of placeholder width
         *
         * @private
         * @returns {void}
         */
        _setDropdownWidth: function () {
            this.optionsSelectorBlock.css('min-width', this.element.width());
        },

        /**
         * Get element data-value attribute
         *
         * @param {Object} [element]
         * @returns {Array}
         */
        getValue: function (element) {
            var result = [];

            element.each(function (index, item) {
                result.push(item.dataset.amselectValue);
            });

            return result;
        }
    });

    return $.mage.amSelect;
});
