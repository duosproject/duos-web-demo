(function () {
    'use strict';

    angular
        .module('app',
        [
            'app.core',
            'app.main',
            'app.main.taggedInstances',
            'app.main.joined',
            'app.main.articles'
        ]);
})();