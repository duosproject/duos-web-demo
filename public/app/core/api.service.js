(function () {
    'use strict';

    angular
        .module('app.core')
        .service('ApiService', ApiService);

    ApiService.$inject = ['$http'];
    function ApiService($http) {
        var service = {
            getTaggedInstances: getTaggedInstances
        };

        return service;

        //returns all the records from TaggedInstances table
        function getTaggedInstances() {
            return $http.get('/api/core/taggedInstances');
        }
    }
})();