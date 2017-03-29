(function () {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$state', '$rootScope'];
    function ApplicationController($state, $rootScope) {
        var vm = this;
        var defaultState = 'main.all';

        activate();

        function activate() {
            $state.go(defaultState);
        }

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //dynamic page title
            $rootScope.pageTitle = toState.data.title;

            //preventing from accessing plain main state
            if (toState.name === 'main') {
                event.preventDefault();
                $state.go(defaultState);
            }
        });
    }
})();