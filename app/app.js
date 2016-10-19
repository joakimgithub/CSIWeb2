'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ui.router',
    'ngAnimate',
    'myApp.customerView',
    'myApp.customerCsisView',
    'myApp.csiCrudView',
    'myApp.customerCrudView',
    'myApp.csiView'
])

.controller('appController', function($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
})

.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider)
    {
        $locationProvider.hashPrefix('!');
        $urlRouterProvider.otherwise('/customerView');

    }
]);

//app.constant('global.url', 'http://a01c01263c/CSIService/api/');

