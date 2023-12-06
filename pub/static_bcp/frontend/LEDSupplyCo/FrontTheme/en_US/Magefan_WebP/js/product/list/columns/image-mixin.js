/**
 * Copyright © Magefan (support@magefan.com). All rights reserved.
 * Please visit Magefan.com for license details (https://magefan.com/end-user-license-agreement).
 */
define(function () {
    'use strict';

    return function (target) {
        return target.extend({
            getImageUrl: function (row) {
                return MagefanWebP.canUseWebP() ? MagefanWebP.getWebUrl(this._super()) : this._super();
            },
        });
    };
});
