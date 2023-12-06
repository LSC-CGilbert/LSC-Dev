/**
 * Mixin webApiRecaptcha
 */
define(function () {
    'use strict';

    var mixin = {
        /** @inheritDoc */
        _loadApi: function () {
            if (this.settings) {
                this._super();
            }
        }
    };

    return function (WebApiReCaptcha) {
        return WebApiReCaptcha.extend(mixin);
    };
});
