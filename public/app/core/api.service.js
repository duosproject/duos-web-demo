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
            getVariablesForDataset: getVariablesForDataset,
            getArticlesIdsByAuthor: getArticlesIdsByAuthor,
            getArticlesIdsByTopic: getArticlesIdsByTopic,
            getArticlesIdsByMethod: getArticlesIdsByMethod,
            getArticlesByIds: getArticlesByIds
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
        function getVariablesForDataset(datasetId) {
            return $http.get('/api/support/dataset/variables/' + datasetId);
        }

        //returns all articles' IDs for selected author
        function getArticlesIdsByAuthor(authorId) {
            return $http.get('/api/support/articles/author/' + authorId);
        }

        //returns all articles' IDs for selected topic
        function getArticlesIdsByTopic(topicId) {
            return $http.get('/api/support/articles/topic/' + topicId);
        }

        //returns all articles' IDs for selected method
        function getArticlesIdsByMethod(methodId) {
            return $http.get('/api/support/articles/method/' + methodId);
        }

        //returns selected articles' records from all linked tables
        function getArticlesByIds(articlesIds) {
            return $http.post('/api/support/articles/selected', {
                articleIds: articlesIds
            });
        }
    }
})();