/**
 * Copyright © Magefan (support@magefan.com). All rights reserved.
 * Please visit Magefan.com for license details (https://magefan.com/end-user-license-agreement).
 */

(function () {
    'use strict';

    if (!MagefanWebP.canUseWebP()) {
        var repeat = 20;

        var flag = setInterval(function() {
            if (!repeat) {
                clearInterval(flag);
            }

            repeat--;

            replaceWebPImageOnOriginal();
        }, 500);
    }

    function replaceWebPImageOnOriginal()
    {
        let webpImgSelector = 'img[src*="\.webp"]';
        let webpASelector = 'a[href*="\.webp"]';

        document.querySelectorAll(webpImgSelector).forEach((el, i) => {
            el.setAttribute('src', MagefanWebP.getOriginWebPImage(el.getAttribute('src')))
        });

        document.querySelectorAll(webpASelector).forEach((el, i) => {
            el.setAttribute('href', MagefanWebP.getOriginWebPImage(el.getAttribute('href')))
        });
    }
})();
