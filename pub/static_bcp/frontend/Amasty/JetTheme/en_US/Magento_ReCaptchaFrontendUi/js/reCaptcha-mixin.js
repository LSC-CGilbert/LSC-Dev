/**
 * Mixin reCaptcha
 */
define(function () {
    'use strict';

    var mixin = {
        /** @inheritDoc */
        initCaptcha: function () {
            if (this.settings) {
                this._super();
            }
        },

        /** @inheritDoc */
        getIsInvisibleRecaptcha: function () {
            return this.settings && this.settings.invisible;
        }
    };

    return function (ReCaptcha) {
        return ReCaptcha.extend(mixin);
    };
});
