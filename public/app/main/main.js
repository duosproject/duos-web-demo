(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$state', '$mdSidenav'];
    function MainController($state, $mdSidenav) {
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