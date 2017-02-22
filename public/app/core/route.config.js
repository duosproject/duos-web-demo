(function () {
    'use strict';

    angular
        .module('app.core')
        .config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'vm',
                data: {
                    title: 'Main'
                }
            })
            .state('main.grid', {
                url: '/grid',
                templateUrl: 'app/main/grid/grid.html',
                controller: 'GridController',
                controllerAs: 'vm',
                data: {
                    title: 'Tagged Instances Grid'
                }
            });
    }
})();