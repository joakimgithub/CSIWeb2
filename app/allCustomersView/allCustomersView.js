'use strict';

angular.module('myApp.allCustomersView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/allCustomersView', {
    templateUrl: 'allCustomersView/allCustomersView.html',
    controller: 'allCustomersViewCtrl'
  });
}])
.controller('allCustomersViewCtrl', function($scope, $http) {
    $http.get('http://a01c01263c/CSIService/api/CSI_Customer')
    .then(function(response) {
        $scope.customers = response.data;
    });
});
