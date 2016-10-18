'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'myApp.customerView',
<<<<<<< HEAD
    'myApp.allCsisForCustomerView',
    'myApp.csiView',
    'myApp.csiCrudView'
=======
    'myApp.customerCsisView',
    'myApp.csiView'
>>>>>>> origin/master
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/customerView'});
}]);

//app.constant('global.url', 'http://a01c01263c/CSIService/api/');

