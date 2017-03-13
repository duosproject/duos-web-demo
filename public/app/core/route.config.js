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
            .state('main.taggedInstances', {
                url: '/taggedinstances',
                templateUrl: 'app/main/taggedinstances/taggedinstances.html',
                controller: 'TaggedInstancesController',
                controllerAs: 'vm',
                data: {
                    title: 'Tagged Instances'
                }
            })
            .state('main.joined', {
                url: '/joined',
                templateUrl: 'app/main/joined/joined.html',
                controller: 'JoinedController',
                controllerAs: 'vm',
                data: {
                    title: 'Tagged Instances - Articles'
                }
            })
            .state('main.articles', {
                url: '/articles',
                templateUrl: 'app/main/articles/articles.html',
                controller: 'ArticlesController',
                controllerAs: 'vm',
                data: {
                    title: 'Articles'
                }
            });
    }
})();