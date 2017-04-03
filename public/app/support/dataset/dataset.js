(function () {
    'use strict';

    angular
        .module('app.support.dataset')
        .controller('DatasetController', DatasetController);

    DatasetController.$inject = ['$stateParams', '$timeout', '$window', '$mdSidenav', '$mdDialog', 'ApiService'];
    function DatasetController($stateParams, $timeout, $window, $mdSidenav, $mdDialog, ApiService) {
        var vm = this;

        vm.title = '';
        vm.variables = {};

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
            ApiService.getVariablesForDataset($stateParams.datasetId)
                .then(function (res) {
                    if (res.data.collection !== null) {
                        vm.variables.data = res.data.collection.Variables;
                        vm.variables.count = res.data.collection.Variables.length;
                        vm.title = 'Variables for "' + res.data.collection.datasetName + '"';
                        vm.hideLoader = true;
                    }
                    else {
                        generateErrorOnLoading('No data to show');
                    }
                }, function (err) {
                    generateErrorOnLoading(err.data.error);
                });
        }

        function generateErrorOnLoading(errorMessage) {
            vm.errorMessage = errorMessage;
            vm.hideLoader = true;
            vm.showError = true;
            vm.showErrorDialog();
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
            vm.variables.data = [];
            vm.variables.count = 0;
            vm.title = '';

            vm.promise = ApiService.getVariablesForDataset($stateParams.datasetId)
                .then(function (res) {
                    vm.variables.data = res.data.collection.Variables;
                    vm.variables.count = res.data.collection.Variables.length;
                    vm.title = 'Variables for "' + res.data.collection.datasetName + '"';
                }, function (err) {
                    vm.errorMessage = err.data.error;
                    vm.showErrorDialog();
                });
        };
    }
})();