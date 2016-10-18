'use strict';

angular.module('myApp.customerCsisView', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/customerCsisView/:id?', {
    templateUrl: 'customerCsisView/customerCsisView.html',
    controller: 'customerCsisViewCtrl'
  });
}])

.controller('customerCsisViewCtrl',
  ['$scope', '$http',  '$routeParams', function($scope, $http, $routeParams)
     {
      $http.get('http://a01c01263c/CSIService/api/GetCSIListForCustomer/' + $routeParams.id)
      .then(function(response) {
          $scope.CSIs = response.data;
      });


// test data
$scope.CSIs =
      [
          {
          "Id": 1,
          "Id_Customer": 2,
          "Id_Status": 3,
          "AccountManagerName": "sample string 4",
          "AccountManagerEmail": "sample string 5",
          "Engagement": "sample string 6",
          "ProjectNumber": "sample string 7",
          "DeliveryUnit": "sample string 8",
          "InitiationDate": "2016-10-14T14:24:20.8234217+02:00",
          "Consultants": "sample string 9",
          "PlannedDateForFollowUp": "2016-10-14T14:24:20.8234217+02:00",
          "FollowedUpDate": "2016-10-14T14:24:20.8234217+02:00",
          "FollowedUpByClient": "sample string 10",
          "SimpleCSI": true,
          "Created": "2016-10-14T14:24:20.8234217+02:00",
          "CreatedBy": "sample string 13",
          "Updated": "2016-10-14T14:24:20.8234217+02:00",
          "UpdatedBy": "sample string 14",
          "ClientName": "sample string 15",
          "ClientEmail": "sample string 16",
          "InitiatedByClient": "sample string 17",
          "CSI_Customer": {
              "$id": "2",
              "Id": 1,
              "Customer": "sample string 2",
              "CreatedTime": "2016-10-14T14:24:20.8234217+02:00",
              "CreatedBy": "sample string 4",
              "UpdatedTime": "2016-10-14T14:24:20.8234217+02:00",
              "UpdatedBy": "sample string 5",
              "Active": true,
              "CSI": [
              {
                  "$ref": "1"
              },
              {
                  "$ref": "1"
              }
              ]
          },
          "CSI_Status": {
              "$id": "3",
              "Id": 1,
              "Status": "sample string 2",
              "Description": "sample string 3",
              "Tag": "sample string 4",
              "CreatedTime": "2016-10-14T14:24:20.8239225+02:00",
              "CreatedBy": "sample string 6",
              "UpdatedTime": "2016-10-14T14:24:20.8239225+02:00",
              "UpdatedBy": "sample string 7",
              "CSI": [
              {
                  "$ref": "1"
              },
              {
                  "$ref": "1"
              }
              ]
          }
          }
      ]

    } //Controller
  ])
