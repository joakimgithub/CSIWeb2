'use strict';

angular.module('myApp.allCsisForCustomerView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/allCsisForCustomerView', {
    templateUrl: 'allCsisForCustomerView/allCsisForCustomerView.html',
    controller: 'allCsisForCustomerViewCtrl'
  });
}])
.controller('allCsisForCustomerViewCtrl', function($scope, $http) {
    $http.get('http://a01c01263c/CSIService/api/CSIs/Customer/1')
    .then(function(response) {
        $scope.CSIs = response.data;
    });
});
