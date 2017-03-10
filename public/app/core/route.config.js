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
                url: '/taggedInstances',
                templateUrl: 'app/main/taggedInstances/taggedInstances.html',
                controller: 'TaggedInstancesController',
                controllerAs: 'vm',
                data: {
                    title: 'Tagged Instances'
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