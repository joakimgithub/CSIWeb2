angular.module('myApp.csiCrudView', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        'use strict';
        $routeProvider.when('/csiCrudView/:id?', {
            templateUrl: 'csiCrudView/csiCrudView.html',
            controller: 'csiController'
        });
    }])

    .service('modalService', ['$uibModal', function ($uibModal) {
        'use strict';
        var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/app/csiCrudView/Modal.html'
            },
            modalOptions = {
                closeButtonText: 'Close',
                actionButtonText: 'OK',
                headerText: 'Proceed?',
                bodyText: 'Perform this action?',
                csi: null
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

    .factory('csiFactory', function ($http) {
        'use strict';
        var baseAddress = 'http://a01c01263c/CSIService/api/',
            url = "";
        return {
            getCSIListForCustomer: function (custId) {
                url = baseAddress + "GetCSIListForCustomer/" + custId;
                return $http.get(url);
            },
            getCsisList: function () {
                url = baseAddress + "GetCSIList";
                return $http.get(url);
            },
            getCsi: function (csi) {
                url = baseAddress + "GetCSI/" + csi.Id;
                return $http.get(url);
            },
            addCsi: function (csi) {
                url = baseAddress + "AddCSI";
                return $http.post(url, csi);
            },
            deleteCsi: function (csi) {
                url = baseAddress + "DeleteCSI/" + csi.Id;
                return $http.delete(url);
            },
            updateCsi: function (csi) {
                url = baseAddress + "ModifyCSI/" + csi.Id;
                return $http.put(url, csi);
            }
        };
    })

    .controller('csiController', ['$scope', '$route', '$location', 'csiFactory', 'modalService', '$routeParams',
                                  function PostController($scope, $route, $location, csiFactory, modalService, $routeParams) {
        'use strict';

        $scope.sortBy = 'Id'; // default value
        $scope.sortDescending = false; // default ascending
        $scope.searchText = ''; // default blank
        $scope.custId = $routeParams.id;

        // ************************
        // Get all csis for a customer
        // ************************
        $scope.getCSIListForCustomer = function () {
            csiFactory.getCSIListForCustomer(custId).success(function (data) {
                $scope.csis = data;
            }).error(function (data) {
                $scope.error = "An Error has occured while Loading csis for customer! " + data.ExceptionMessage;
            });
        };

        // ************************
        // Get all csis
        // ************************
        $scope.getAll = function () {
            csiFactory.getCsisList().success(function (data) {
                $scope.csis = data;
            }).error(function (data) {
                $scope.error = "An Error has occured while Loading csis! " + data.ExceptionMessage;
            });
        };

        // ************************
        // Copy csi
        // ************************
        $scope.copyCsi = function (csi) {
            var csiToIns = csi.Id + ' ' + csi.Engagement,

            // ************************
            // Modal for CSI insert
            // ************************
                modalInsertDefaults = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: '/app/csiCrudView/csiCopyModal.html'
                },
                modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Copy CSI',
                    headerText: 'Make a copy of CSI: ' + csiToIns + '?',
                    bodyText: 'Are you sure you want to Copy this CSI?',
                    csi: csi
                };

            modalService.showModal(modalInsertDefaults, modalOptions).then(function (result) {
                csiFactory.addCsi(csi).success(function () {
                    $location.path('/CsiCrudView');
                    $route.reload();
                })
                    .error(function (error, status) {
                        $scope.process = { message: error, status: status};
                        console.log('Här kommer ett fel: ' + $scope.process.message);
                    });
//                then(function () {
//                    $location.path('/CsiCrudView');
//                    $route.reload();
//                });
            });
        };

        // ************************
        // insert Csi
        // ************************
        $scope.insertCsi = function () {
            var csi = $scope.newEmptyCsi(),
            // ************************
            // Modal for CSI insert
            // ************************
                modalInsertDefaults = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: '/app/csiCrudView/csiInsertModal.html'
                },
                modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Insert CSI',
                    headerText: 'Insert',
                    bodyText: 'Are you sure you want to insert this CSI?',
                    csi: csi
                };

            modalService.showModal(modalInsertDefaults, modalOptions).then(function (result) {
                csiFactory.addCsi(csi).then(function () {
                    $location.path('/CsiCrudView');
                });
            });
        };

        // ************************
        // update Csi
        // ************************
        $scope.updateCsi = function (csi) {
            var csiToUpd = csi.Id + ' ' + csi.Engagement,

                // ************************
                // Modal for CSI update
                // ************************
                modalUpdateDefaults = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: '/app/csiCrudView/csiUpdateModal.html'
                },
                modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Update CSI',
                    headerText: 'Update ' + csiToUpd + '?',
                    bodyText: 'Are you sure you want to update this CSI?',
                    csi: csi
                };

            modalService.showModal(modalUpdateDefaults, modalOptions).then(function (result) {
                csiFactory.updateCsi(csi).then(function () {
                    $location.path('/CsiCrudView');
                });
            });
        };

        // ************************
        // delete Csi
        // ************************
        $scope.deleteCsi = function (csi) {
            var csiToDel = csi.Id + ' ' + csi.Engagement,

            // ************************
            // Modal for CSI delete
            // ************************
                modalDeleteDefaults = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: '/app/csiCrudView/csiDeleteModal.html'
                },
                modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Delete CSI',
                    headerText: 'Delete ' + csiToDel + '?',
                    bodyText: 'Are you sure you want to delete this CSI?',
                    csi: csi
                };

            modalService.showModal(modalDeleteDefaults, modalOptions).then(function (result) {
                csiFactory.deleteCsi(csi).then(function () {
                    $location.path('/CsiCrudView');
                });
            });
        };

        $scope.newEmptyCsi = function () {
            var csi = {
                    Id: null,
                    Id_Customer: null,
                    Id_Status: null,
                    ClientName: null,
                    ClientEmail: null,
                    InitiatedByClient: null,
                    AccountManagerName: null,
                    AccountManagerEmail: null,
                    Engagement: null,
                    ProjectNumber: null,
                    DeliveryUnit: null,
                    InitiationDate: null,
                    Consultants: null,
                    PlannedDateForFollowUp: null,
                    FollowedUpDate: null,
                    FollowedUpByClient: null,
                    SimpleCSI: null,
                    Created: null,
                    CreatedBy: null,
                    Updated: null,
                    UpdatedBy: null
                };
            return csi;
        };

        // ************************
        // List all Csis for a customer
        // ************************
        $scope.getCSIListForCustomer = function (custId) {
            var custId = custId;
        };


        // ************************
        // initialize your csi data
        // ************************
        $scope.getAll();

    }]);
