'use strict';

angular.module('myApp.allCsisForCustomerView', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/allCsisForCustomerView/:custId?', {
    templateUrl: 'allCsisForCustomerView/allCsisForCustomerView.html',
    controller: 'allCsisForCustomerViewCtrl'
  });
}])

.controller('allCsisForCustomerViewCtrl', 
  ['$scope', '$http',  '$routeParams', function($scope, $http, $routeParams) 
    {
      $http.get('http://a01c01101c/CSIService/api/GetCSIListForCustomer/' + $routeParams.custId)
      .then(function(response) {
          $scope.CSIs = response.data;
      });
    }
  ]
);

// .controller("customerCtrl", ['$scope', '$http', 'SharedCustomerService', function ($scope, $http, SharedCustomerService) {
// }])