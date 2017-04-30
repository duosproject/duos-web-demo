(function () {
    'use strict';

    angular
        .module('app.main.taggedInstances')
        .controller('TaggedInstancesController', TaggedInstancesController);

    TaggedInstancesController.$inject = ['$timeout', '$window', '$mdSidenav', '$mdDialog', 'ApiService'];
    function TaggedInstancesController($timeout, $window, $mdSidenav, $mdDialog, ApiService) {
        var vm = this;

        vm.taggedInstances = [];

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

        function activate() {
            return ApiService.getTaggedInstances()
                .then(function (res) {
                    vm.taggedInstances = res.data.collection;
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

        vm.hideFilter = function () {
            vm.filter.show = false;
            vm.query.filter = {};
        };

        vm.showFilter = function () {
            vm.filter.show = true;
            $timeout(function () {
                var searchInput = $window.document.getElementById('filterInput');
                if (searchInput) {
                    searchInput.focus();
                }
            });
        };

        vm.refresh = function () {
            vm.taggedInstances = [];
            vm.promise = activate();
        };

        activate();
    }
})();