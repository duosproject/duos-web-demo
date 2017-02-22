(function () {
    'use strict';

    angular
        .module('app.main.grid')
        .controller('GridController', GridController);

    GridController.$inject = ['$state', '$mdSidenav', '$mdDialog', 'ApiService'];
    function GridController($state, $mdSidenav, $mdDialog, ApiService) {
        var vm = this;

        vm.collection = [];

        vm.hideLoader = false;
        vm.showError = false;
        vm.errorMessage = '';

        activate();

        function activate() {
            ApiService.getTaggedInstances()
                .then(function (res) {
                    vm.collection = res.data.collection;
                    vm.hideLoader = true;
                }, function (err) {
                    vm.errorMessage = err.data.error;
                    vm.hideLoader = true;
                    vm.showError = true;
                    vm.showErrorDialog();
                });
        }

        vm.showErrorDialog = function () {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(false)
                    .escapeToClose(false)
                    .title('Error')
                    .textContent(vm.errorMessage)
                    .ariaLabel('Error')
                    .ok('Ok')
            );
        };

        vm.refreshPage = function () {
            location.reload();
        };
    }
})();