/*
 * Fotorama video event mixin
 */
define([
    'jquery'
], function ($) {
    'use strict';

    return function (AddFotoramaVideoEvents) {
        $.widget('mage.AddFotoramaVideoEvents', AddFotoramaVideoEvents, {

            /**
             * @return {void}
             */
            _initialize: function () {
                // eslint-disable-next-line vars-on-top
                for (var i = 0; i < this.options.videoData.length; i++) {
                    if (!this.options.videoData[i]) {
                        this.options.videoData.splice(i, 1);
                    }
                }

                this._super();
            }
        });

        return $.mage.AddFotoramaVideoEvents;
    };
});
