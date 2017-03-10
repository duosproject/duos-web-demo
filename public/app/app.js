(function () {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$state', '$rootScope'];
    function ApplicationController($state, $rootScope) {
        var vm = this;

        activate();

        function activate() {
            //default state
            $state.go('main.taggedInstances');
        }

        //dynamic page title
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.pageTitle = toState.data.title;
        });
    }
})();