'use strict';

//app.config(function($routeProvider) {
//    $routeProvider
//    .when("/", {
//        templateUrl : "main.htm"
//    })
//    .when("/london", {
//        templateUrl : "london.htm",
//        controller : "londonCtrl"
//    })
//    .when("/paris", {
//        templateUrl : "paris.htm",
//        controller : "parisCtrl"
//    });
//});

//var csiView = angular.module('myApp.csiView', ['ngRoute']);
//csiView.config(function ($routeProvider) {
//    $routeProvider.when('/csiView', {
//        templateUrl: 'csiView/csiView.html',
//        controller: 'CsiMainInformationController'
//    });
//});


//csiView.controller('csiViewCtrl', function ($scope, $http) {
//    $http.get('http://a01c01263c/CSIService/api/CSI_Customer')
//    .then(function(response) {
//        $scope.customers = response.data;
//    });
//})

//csiView.directive("csiView/csiText", function () {
//    return {
//        restrict: 'A',
//        templateUrl: 'csi-text.html'
//    };
//});
//
//
//csiView.controller('CsiMainInformationController', function ($scope, CsiMainInformationService) {
//
////    $scope.csi = {
////        Id: '2',
////        Id_Customer: '1',
////        Id_Status: '1',
////        ClientName: 'Putte Kock',
////        ClientEmail: 'Putte.Kock@mail.se',
////        InitiatedByClient: 'SSAB Oxelösund',
////        AccountManagerName: 'Jan Lindeberg',
////        AccountManagerEmail: 'jan.lindeberg@sogeti.se',
////        Engagement: 'Nytt Intranät, EPI-Server',
////        ProjectNumber: '55678',
////        DeliveryUnit: 'Nyköping',
////        InitiationDate: '',
////        Consultants: '',
////        PlannedDateForFollowUp: '',
////        FollowedUpDate: '',
////        FollowedUpByClient: '',
////        SimpleCSI: '0',
////        Created: '',
////        CreatedBy: 'Janne',
////        Updated: '',
////        UpdatedBy: ''
////    };
//
////    getCSIMainData();
////     function getCSIMainData() {
////         var servCall = CsiMainInformationService.getCSIMainData();
////         servCall.then(function (data) {
////             //debugger;
////              $scope.csi = data;
////
////         }, function (error) {
////             $log.error('Oops! Something went wrong while fetching the data.')
////         })
////    }
//});

//csiView.service("CsiMainInformationService", function ($http) {
//    this.getCSIMainData = function () {
//        var url = 'http://A01C01263C//CSIService/api/CSIs/1';
//        return $http.get(url).then(function (response) {
//            return response.data;
//
//        });
//    };
//});

