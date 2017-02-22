(function () {
    'use strict';

    angular
        .module('app')
        .config(AppConfig);

    AppConfig.$inject = ['$mdIconProvider'];

    function AppConfig($mdIconProvider) {
        $mdIconProvider
            .icon('menu', './assets/images/svg/menu.svg', 24)
            .icon('warning', './assets/images/svg/warning.svg', 24);
    }
})();