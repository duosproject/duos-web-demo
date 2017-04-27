(function () {
    'use strict';

    angular
        .module('app.main.joined')
        .controller('JoinedController', JoinedController);

    JoinedController.$inject = ['$timeout', '$window', '$mdSidenav', '$mdDialog', 'ApiService'];
    function JoinedController($timeout, $window, $mdSidenav, $mdDialog, ApiService) {
        var vm = this;

        vm.taggedInstancesArticles = [];

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
            return ApiService.getTaggedInstancesArticles()
                .then(function (res) {
                    vm.taggedInstancesArticles = res.data.collection;
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
            vm.taggedInstancesArticles = [];
            vm.promise = activate();
        };

        activate();
    }
})();