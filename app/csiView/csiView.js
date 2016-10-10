'use strict';

angular.module('myApp.csiView', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/csiView', {
    templateUrl: 'csiView/csiView.html',
    controller: 'csiViewCtrl'
  });
}])
.controller('csiViewCtrl', function($scope, $http) {
    $http.get('http://a01c01263c/CSIService/api/CSI_Customer')
    .then(function(response) {
        $scope.customers = response.data;
    });
})

.directive("csiView/csiText", function() {
    return {
        restrict: 'A',
        templateUrl: 'csi-text.html'
    };
});

//CsiQualityCriteriaController
//
//.(function () {
//
//    app = angular.module("CsiApp", []);
//    app.directive("csiText", function() {
//        return {
//            restrict: 'A',
//            templateUrl: 'csi-text.html'
//        };
//    });
//}());
