(function () {
    'use strict';

    angular
        .module('app.support.selected')
        .controller('SelectedController', SelectedController);

    SelectedController.$inject = ['$stateParams', '$timeout', '$window', '$mdSidenav', '$mdDialog', 'ApiService'];
    function SelectedController($stateParams, $timeout, $window, $mdSidenav, $mdDialog, ApiService) {
        var vm = this;

        vm.title = '';
        vm.records = [];

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
            limit: 10,
            page: 1
        };

        vm.promise = {};

        function activate() {
            switch ($stateParams.type) {
                case 'author': {
                    vm.title = 'Author: ';
                    return process(ApiService.getArticlesIdsByAuthor);
                }
                    break;
                case 'topic': {
                    vm.title = 'Topic: ';
                    return process(ApiService.getArticlesIdsByTopic);
                }
                    break;
                case 'method': {
                    vm.title = 'Methodology: ';
                    return process(ApiService.getArticlesIdsByMethod);
                }
                    break;
                default: {
                    vm.errorMessage = 'Incorrect URL parameter';
                    vm.hideLoader = true;
                    vm.showError = true;
                    vm.showErrorDialog();
                }
            }
        }

        function process(processFunction) {
            processFunction($stateParams.id)
                .then(function (res) {
                    vm.title += res.data.set.title;
                    fetchArticles(res.data.set.ids);
                }, function (err) {
                    vm.errorMessage = err.set.error;
                    vm.hideLoader = true;
                    vm.showError = true;
                    vm.showErrorDialog();
                });
        }

        function fetchArticles(articlesIds) {
            ApiService.getArticlesByIds(articlesIds)
                .then(function (res) {
                    vm.records = res.data.collection;
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
            vm.records = [];
            vm.promise = activate();
        };

        activate();
    }
})();