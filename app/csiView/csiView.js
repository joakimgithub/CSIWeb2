angular.module('myApp.csiView', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        'use strict';
        $routeProvider.when('/csiView', {
            templateUrl: 'csiView/csiView.html',
            controller: 'CsiMainInformationController'
        });
    }])

    // *** Directives ***
    // Directive csiText
    .directive("csiText", function() {
        return {
            restrict: 'A',
            templateUrl: 'csiView/csi-text.html'
        };
    })

    // *** Services ***
    // Service SharedDataService
    .service('SharedDataService', function () {
        'use strict';
        var ShareData = {
                totalIV: 0,
                totalV5: 0,
                total: 0};
        return ShareData;
    })  // End SharedDataService


    // Service CsiQualityCriteriaService
    .service("CsiQualityCriteriaService", function ($http) {
        'use strict';
        this.getCSIQualityCriteria = function () {
            var url = 'http://A01C01101C//CSIService/api/CSI_QualityCriteria/CsiID/1';
            return $http.get(url).then(function (response) {
                return response.data;

            });
        };
    }) // End CsiQualityCriteriaService

    // Service CsiMainInformationService
    .service("CsiMainInformationService", function ($http) {
        'use strict';
        this.getCSI = function () {
            var url = 'http://A01C01101C//CSIService/api/CSIs/1';
            return $http.get(url).then(function (response) {
                return response.data;
            });
        };
    })  // End CsiMainInformationService


    // *** Controllers ***
    // Controller CsiQualityCriteriaController
    .controller('CsiQualityCriteriaController',  ['$scope', 'CsiQualityCriteriaService', 'SharedDataService', function ($scope, CsiQualityCriteriaService,SharedDataService) {
        'usee strict';
        $scope.ShareData = SharedDataService;

            //$scope.csiQualityCriterias = [{QualityCriteria: "Leverera i tid", Importance: 4, Value: 4}, {QualityCriteria: "Vara lyhörd för användarens åsikter", //Importance: 4, Value: 5}];


        getCSIQCData();
        function getCSIQCData() {
            var servCall = CsiQualityCriteriaService.getCSIQualityCriteria();
            servCall.then(function (data) {
             //debugger;
                $scope.csiQualityCriterias = data;

                angular.forEach($scope.csiQualityCriterias, function(csiQualityCriterias){
                    $scope.ShareData.totalIV = $scope.ShareData.totalIV + (csiQualityCriterias.Importance * csiQualityCriterias.Value);
                    $scope.ShareData.totalV5 = $scope.ShareData.totalV5 + (csiQualityCriterias.Value *5);
                    $scope.ShareData.total =(Math.round((($scope.ShareData.totalIV/$scope.ShareData.totalV5) * 5) * 10) / 10);
                })
            }, function (error) {
                $log.error('Oops! Something went wrong while fetching the data.')
            })
        } // End OSIQCData

        $scope.totalImpVal = function(){
            var total = 0;
            angular.forEach($scope.csiQualityCriterias, function(csiQualityCriterias){
                total = total + (csiQualityCriterias.Importance * csiQualityCriterias.Value);
            })
            return total;
        }

        $scope.totalImp5 = function(){
            var total = 0;
            angular.forEach($scope.csiQualityCriterias, function(csiQualityCriterias){
                total = total + (csiQualityCriterias.Value * 5);
            })
            return total;
        }

        $scope.qualityValue = function(){
            var total = 0;
            var totalV5 = 0;
            var totalIV = 0;
            angular.forEach($scope.csiQualityCriterias, function(csiQualityCriterias){
                totalIV = totalIV + (csiQualityCriterias.Importance * csiQualityCriterias.Value);
                totalV5 = totalV5 + (csiQualityCriterias.Value * 5);
                total =(Math.round(((totalIV/totalV5) * 5) * 10) / 10);
            })
            return total;
        }
    }])  // End CsiQualityCriteriaController

    // Controller CsiMainInformationController
    .controller('CsiMainInformationController', ['$scope', 'CsiMainInformationService','SharedDataService', function ($scope, CsiMainInformationService, SharedDataService) {
        'use strict';
        $scope.ShareData = SharedDataService;

        //    $scope.csi = {
        //        Id: '2',
        //        Id_Customer: '1',
        //        Id_Status: '1',
        //        ClientName: 'Putte Kock',
        //        ClientEmail: 'Putte.Kock@mail.se',
        //        InitiatedByClient: 'SSAB Oxelösund',
        //        AccountManagerName: 'Jan Lindeberg',
        //        AccountManagerEmail: 'jan.lindeberg@sogeti.se',
        //        Engagement: 'Nytt Intranät, EPI-Server',
        //        ProjectNumber: '55678',
        //        DeliveryUnit: 'Nyköping',
        //        InitiationDate: '',
        //        Consultants: '',
        //        PlannedDateForFollowUp: '',
        //        FollowedUpDate: '',
        //        FollowedUpByClient: '',
        //        SimpleCSI: '0',
        //        Created: '',
        //        CreatedBy: 'Janne',
        //        Updated: '',
        //        UpdatedBy: ''
        //    };

        function getCSIMainData() {
            var servCall = CsiMainInformationService.getCSI();
            servCall.then(function (data) {
                //debugger;
                $scope.csi = data;
            }, function (error) {
                $log.error('Oops! Something went wrong while fetching the data.');
            });
        };

        getCSIMainData();

    }]); // End CsiMainInformationService
