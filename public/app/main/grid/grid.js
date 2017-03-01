(function () {
    'use strict';

    angular
        .module('app.main.grid')
        .controller('GridController', GridController);

    GridController.$inject = ['$state', '$mdSidenav', '$mdDialog', 'ApiService'];
    function GridController($state, $mdSidenav, $mdDialog, ApiService) {
        var vm = this;

        vm.taggedInstances = {};

        vm.hideLoader = false;
        vm.showError = false;
        vm.errorMessage = '';

        vm.limitOptions = [10, 20, 30, 40, 50, 100];

        vm.filter = {
            options: {
                debounce: 300
            }
        };

        vm.query = {
            filter: {},
            order: '',
            limit: 10,
            page: 1
        };

        vm.promise = {};

        activate();

        function activate() {
            ApiService.getTaggedInstances()
                .then(function (res) {
                    vm.taggedInstances.data = res.data.collection;
                    vm.taggedInstances.count = res.data.collection.length;
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

        vm.removeFilter = function () {
            vm.filter.show = false;
            vm.query.filter = '';
        };

        vm.refresh = function () {
            vm.taggedInstances.data = [];
            vm.taggedInstances.count = 0;

            vm.promise = ApiService.getTaggedInstances()
                .then(function (res) {
                    vm.taggedInstances.data = res.data.collection;
                    vm.taggedInstances.count = res.data.collection.length;
                }, function (err) {
                    vm.errorMessage = err.data.error;
                    vm.showErrorDialog();
                });
        };
    }
})();