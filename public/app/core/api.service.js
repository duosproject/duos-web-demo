(function () {
    'use strict';

    angular
        .module('app.core')
        .service('ApiService', ApiService);

    ApiService.$inject = ['$http'];
    function ApiService($http) {
        var service = {
            getTaggedInstances: getTaggedInstances,
            getArticles: getArticles,
            getTaggedInstancesArticles: getTaggedInstancesArticles,
            getGlobal: getGlobal,
            getVariablesForDataset: getVariablesForDataset
        };

        return service;

        //returns all the records from TaggedInstances table
        function getTaggedInstances() {
            return $http.get('/api/core/taggedInstances');
        }

        //returns all the records from Articles table
        function getArticles() {
            return $http.get('/api/core/articles');
        }

        //returns all the records from TaggedInstances table joined with Articles table
        function getTaggedInstancesArticles() {
            return $http.get('/api/core/taggedInstances/articles');
        }

        //returns all the records from all joined tables
        function getGlobal() {
            return $http.get('/api/core/global');
        }

        //returns all variables for selected dataset
        function getVariablesForDataset(datasetId){
            return $http.get('/api/support/dataset/variables/' + datasetId);
        }
    }
})();