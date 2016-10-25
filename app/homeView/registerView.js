(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('registerViewController', registerViewController)
        .service('registerViewService', registerViewService);


    registerViewController.$inject = ['registerViewService', '$location', '$rootScope', 'FlashService'];
    function registerViewController(registerViewService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }


    registerViewController.$inject = ['$uibModal'];
    function registerViewService($uibModal) {
        'use strict';
        var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/app/intCustomerView/Modal.html'
            },
            modalOptions = {
                closeButtonText: 'Close',
                actionButtonText: 'OK',
                headerText: 'Proceed?',
                bodyText: 'Perform this action?',
                customer: null
            };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) {
                customModalDefaults = {};
            }
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {},
                tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $uibModalInstance) {
                    $scope.modalOptions = tempModalOptions;

                    $scope.modalOptions.ok = function (result) {
                        $uibModalInstance.close(result);
                    };

                    $scope.modalOptions.close = function (result) {
                        $uibModalInstance.dismiss('cancel');
                    };
                };
            }
            return $uibModal.open(tempModalDefaults).result;
        };
    }


})();
