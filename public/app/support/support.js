(function () {
    'use strict';

    angular
        .module('app.support')
        .controller('SupportController', SupportController);

    SupportController.$inject = ['$state', '$mdSidenav'];
    function SupportController($state, $mdSidenav) {
        var vm = this;

        vm.openMenu = function () {
            $mdSidenav('left').toggle();
        };

        vm.closeMenu = function () {
            $mdSidenav('left').close();
        };

        vm.changeStateFromMenu = function (stateName) {
            $mdSidenav('left').close();
            $state.go(stateName);
        };
    }
})();