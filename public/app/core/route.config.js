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
            })
            .state('main.global', {
                url: '/global',
                templateUrl: 'app/main/global/global.html',
                controller: 'GlobalController',
                controllerAs: 'vm',
                data: {
                    title: 'Global'
                }
            })
            .state('support', {
                url: '/support',
                templateUrl: 'app/support/support.html',
                controller: 'SupportController',
                controllerAs: 'vm',
                data: {
                    title: 'Support'
                }
            })
            .state('support.dataset', {
                url: '/dataset/:datasetId',
                templateUrl: 'app/support/dataset/dataset.html',
                controller: 'DatasetController',
                controllerAs: 'vm',
                data: {
                    title: 'Dataset'
                }
            })
            .state('support.selected', {
                url: '/selected/:type/:id',
                templateUrl: 'app/support/selected/selected.html',
                controller: 'SelectedController',
                controllerAs: 'vm',
                data: {
                    title: 'Selected'
                }
            });
    }
})();