angular.module('myApp.customerView', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/customerView', {
    templateUrl: 'customerView/customerView.html',
    controller: 'customerCtrl'
  });
}])

.controller("customerCtrl", ['$scope', '$http', function ($scope, $http) {
    
    $scope.pageTitle = 'Customers';

    // $http.get('http://a01c01263c/CSIService/api/GetCustomerList')
    // .then(function(response) {
    //     $scope.customers = response.data;
    // });

    $scope.sortBy = 'Customer'; // default value
    $scope.sortDescending = false; // default ascending
    $scope.searchText = ''; // default blank

    $scope.customers = 
    [
      {
        "$id": "1",
        "Id": 1,
        "Customer": "Landstinget Sörmland",
        "CreatedTime": "2016-10-14T14:13:44.0533391+02:00",
        "CreatedBy": "Jocke",
        "UpdatedTime": "2016-10-14T14:13:44.0533391+02:00",
        "UpdatedBy": "sample string 5",
        "Active": true
      },
        {
        "$id": "2",
        "Id": 2,
        "Customer": "SSAB1 Oxelösund",
        "CreatedTime": "2016-10-14T14:13:44.0533391+02:00",
        "CreatedBy": "Jocke",
        "UpdatedTime": "2016-10-14T14:13:44.0533391+02:00",
        "UpdatedBy": "sample string 5",
        "Active": true
      }
    ]


}])
