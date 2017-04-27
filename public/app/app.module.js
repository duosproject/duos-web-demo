(function () {
    'use strict';

    angular
        .module('app',
        [
            'app.core',

            'app.main',
            'app.main.taggedInstances',
            'app.main.joined',
            'app.main.articles',
            'app.main.global',

            'app.support',
            'app.support.dataset',
            'app.support.selected'
        ]);
})();