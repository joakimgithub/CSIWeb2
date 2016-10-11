'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.allCustomersView',
    'myApp.allCsisForCustomerView',
    'myApp.csiView'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/allCustomersView'});
}]);

//app.constant('global.url', 'http://a01c01263c/CSIService/api/');

