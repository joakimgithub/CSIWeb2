angular.module('myApp.intCustomerView', ['ui.bootstrap'])

.config(['$stateProvider', function ($stateProvider)
{
    $stateProvider
        .state('intCustomerView', {
        url: '/intCustomerView',
        templateUrl: 'intCustomerView/intCustomerView.html',
        controller: 'customerController'
    });
}])

.service('modalService', ['$uibModal', function ($uibModal) {
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
}])

.factory('customerFactory', function ($http) {
    'use strict';
    var baseAddress = 'http://a01c01101c/CSIService/api/',
        url = "";
    return {
        getCustomerList: function () {
            url = baseAddress + "GetCustomerList";
            return $http.get(url);
        },
        getCustomer: function (customer) {
            url = baseAddress + "GetCustomer/" + customer.Id;
            return $http.get(url);
        },
        addCustomer: function (customer) {
            url = baseAddress + "AddCustomer";
            return $http.post(url, customer);
        },
        deleteCustomer: function (customer) {
            url = baseAddress + "DeleteCustomer/" + customer.Id;
            return $http.delete(url);
        },
        updateCustomer: function (customer) {
            url = baseAddress + "ModifyCustomer/" + customer.Id;
            return $http.put(url, customer);
        }
    };
})

.controller('customerController', ['$scope', '$state', '$location', 'customerFactory', 'modalService', '$stateParams',
                              function PostController($scope, $state, $location, customerFactory, modalService, $stateParams) {
        'use strict';

        $scope.sortBy = 'Id'; // default value
        $scope.sortDescending = false; // default ascending
        $scope.searchText = ''; // default blank
        $scope.custId = $stateParams.id;


        // ************************
        // Get all customers
        // ************************
        $scope.getAllCustomers = function () {
            customerFactory.getCustomerList().success(function (data) {
                $scope.customers = data;
            }).error(function (data) {
                $scope.error = "An Error has occured while Loading customers! " + data.ExceptionMessage;
            });
        };

        // ************************
        // Copy customer
        // ************************
        $scope.copyCustomer = function (customer) {
            var customerToIns = customer.Id + ' ' + customer.CustomerCode,

            // ************************
            // Modal for Customer insert
            // ************************
                modalInsertDefaults = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: '/app/intCustomerView/intCustomerCopyModal.html'
                },
                modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Copy Customer',
                    headerText: 'Make a copy of Customer: ' + customerToIns + '?',
                    bodyText: 'Are you sure you want to Copy this Customer?',
                    customer: customer
                };

            modalService.showModal(modalInsertDefaults, modalOptions).then(function (result) {
                customerFactory.addCustomer(customer).success(function () {
                    $location.path('/intCustomerView');
                    $state.go($state.current.name, $state.params, { reload: true });
                    $scope.information = "Added Customer: " + customer.CustomerCode + ' ' + customer.CustomerName;
                }).error(function (data) {
                    $scope.error = "An Error has occured while inserting customer! " + data.ExceptionMessage;
                });
            });
        };

        // ************************
        // insert Customer
        // ************************
        $scope.insertCustomer = function () {
            var customer = $scope.newEmptyCustomer(),
            // ************************
            // Modal for Customer insert
            // ************************
                modalInsertDefaults = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: '/app/intCustomerView/intCustomerInsertModal.html'
                },
                modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Insert Customer',
                    headerText: 'Insert',
                    bodyText: 'Are you sure you want to insert this Customer?',
                    customer: customer
                };

            modalService.showModal(modalInsertDefaults, modalOptions).then(function (result) {
                customerFactory.addCustomer(customer).success(function () {
                    $location.path('/intCustomerView');
                    $state.go($state.current.name, $state.params, { reload: true });
                    $scope.information = "Added Customer: " + customer.CustomerCode + ' ' + customer.CustomerName;
                }).error(function (data) {
                    $scope.error = "An Error has occured while inserting customer! " + data.ExceptionMessage;
                });
            });
        };

        // ************************
        // update Customer
        // ************************
        $scope.updateCustomer = function (customer) {
            var customerToUpd = customer.Id + ' ' + customer.CustomerCode,

                // ************************
                // Modal for Customer update
                // ************************
                modalUpdateDefaults = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: '/app/intCustomerView/intCustomerUpdateModal.html'
                },
                modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Update Customer',
                    headerText: 'Update ' + customerToUpd + '?',
                    bodyText: 'Are you sure you want to update this Customer?',
                    customer: customer
                };

            modalService.showModal(modalUpdateDefaults, modalOptions).then(function (result) {
                customerFactory.updateCustomer(customer).success(function () {
                    $location.path('/intCustomerView');
                    $state.go($state.current.name, $state.params, { reload: true });
                    $scope.information = "Updated Customer: " + customer.Id + ' ' + customer.CustomerCode + ' ' + customer.CustomerName;
                }).error(function (data) {
                    $scope.error = "An Error has occured while updating customer! " + data.ExceptionMessage;
                });
            });
        };

        // ************************
        // delete Customer
        // ************************
        $scope.deleteCustomer = function (customer) {
            var customerToDel = customer.Id + ' ' + customer.CustomerCode,

            // ************************
            // Modal for Customer delete
            // ************************
                modalDeleteDefaults = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: '/app/intCustomerView/intCustomerDeleteModal.html'
                },
                modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Delete Customer',
                    headerText: 'Delete ' + customerToDel + '?',
                    bodyText: 'Are you sure you want to delete this Customer?',
                    customer: customer
                };

            modalService.showModal(modalDeleteDefaults, modalOptions).then(function (result) {
                customerFactory.deleteCustomer(customer).success(function () {
                    $location.path('/intCustomerView');
                    $state.go($state.current.name, $state.params, { reload: true });
                    $scope.information = "Deleted Customer: " + customer.Id + ' ' + customer.CustomerCode + ' ' + customer.CustomerName;
                }).error(function (data) {
                    $scope.error = "An Error has occured while deleting customer! " + data.ExceptionMessage;
                });
            });
        };

        $scope.newEmptyCustomer = function () {
            var customer = {
                    Id: null,
                    CustomerCode: null,
                    CustomerName: null,
                    CustomerEmail: null,
                    Created: null,
                    CreatedBy: null,
                    Updated: null,
                    UpdatedBy: null
                };
            return customer;
        };

        // ************************
        // initialize your customer data
        // ************************
        $scope.getAllCustomers();

    }]);
