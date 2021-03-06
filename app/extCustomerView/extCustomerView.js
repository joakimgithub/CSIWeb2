'use strict';
angular.module('myApp.extCustomerView', [])

.config(['$stateProvider', function ($stateProvider)
    {

    $stateProvider
        .state('extCustomerView', {
        url: '/extCustomerView',
        templateUrl: 'extCustomerView/extCustomerView.html',
    controller: 'customerCtrl'
    });

    }])

.controller("customerCtrl", ['$scope', '$http', function ($scope, $http) {

    $scope.pageTitle = 'Customers';

    $http.get('http://a01c01101c/CSIService/api/GetCustomerList')
    .then(function(response) {
        $scope.customers = response.data;
    });

    $scope.sortBy = 'Customer'; // default value
    $scope.sortDescending = false; // default ascending
    $scope.searchText = ''; // default blank

    $scope.customersTest = [
        { 'name': 'Ali Adravi', 'gendar': 'Male', 'age': 33, 'salary': 123400 },
        { 'name': 'Ajay Devgon', 'gendar': 'Male', 'age': 45, 'salary': 400000 },
        { 'name': 'Aishwarya Roe', 'gendar': 'Female', 'age': 30, 'salary': 900000 },
        { 'name': 'Salman khan', 'gendar': 'Male', 'age': 44, 'salary': 1200000 },
        { 'name': 'John Smith', 'gendar': 'Male', 'age': 18, 'salary': 34000 },
        { 'name': 'Angelina Jolie', 'gendar': 'Femal', 'age': 33, 'salary': 9900000 },
    ];

}]);
