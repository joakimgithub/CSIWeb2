'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.customerView',
    'myApp.customerCsisView',
    'myApp.csiView'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/customerView'});
}]);

//app.constant('global.url', 'http://a01c01263c/CSIService/api/');

