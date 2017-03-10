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
            .state('main.taggedinstances', {
                url: '/taggedinstances',
                templateUrl: 'app/main/taggedinstances/taggedinstances.html',
                controller: 'TaggedInstancesController',
                controllerAs: 'vm',
                data: {
                    title: 'Tagged Instances'
                }
            });
    }
})();