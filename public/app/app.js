(function () {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$state', '$rootScope'];
    function ApplicationController($state, $rootScope) {
        var vm = this;
        var defaultState = 'main.global';

        activate();

        function activate() {
            $state.go(defaultState);
        }

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //dynamic page title
            $rootScope.pageTitle = toState.data.title;

            //preventing from accessing plain parent states
            if (toState.name === 'main' || toState.name === 'support') {
                event.preventDefault();
                $state.go(defaultState);
            }
        });
    }
})();