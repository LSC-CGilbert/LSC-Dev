define([ 'jquery' ], function ($) {
    'use strict';

    $('a.action.showcart').on('click', function () {
        $(document.body).trigger('processStart');
    });
});
