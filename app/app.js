(function () {
    'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngCookies',
    'ui.router',
    'ngAnimate',
    //'myApp.welcomeView',
    'myApp.extCustomerView',
    'myApp.extCustomerCsisView',
    'myApp.extCsiView',
    'myApp.intCustomerView',
    'myApp.intCsiView'
])
.config(config)
.controller(vm)
.run(run);

controller('appController', function($scope, $route, $stateParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$stateParams = $stateParams;
})

config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
function config($locationProvider, $stateProvider, $urlRouterProvider)
{
    var currentUser =
        { 'name': 'Ali Adravi', 'role': 'admin', 'age': 33, 'salary': 123400 };

//    $stateProvider
//    .state('welcomeView', {
//        url: '/welcomeView',
//        controller: 'HomeController',
//        templateUrl: 'welcomeView/welcomeView.html',
//        controllerAs: 'vm'
//    })
//    .state('login', {
//        url: '/loginView',
//        controller: 'loginController',
//        templateUrl: 'loginView/loginView.html',
//        controllerAs: 'vm'
//    })
//    .state('registerView', {
//        controller: 'registerController',
//        url: '/registerView',
//        templateUrl: 'registerView/registerView.html',
//        controllerAs: 'vm'
//    })

    $locationProvider.hashPrefix('!');

    if(currentUser.role === "user")
        $urlRouterProvider.otherwise('/extCustomerView');
    if(currentUser.role === "admin")
        $urlRouterProvider.otherwise('/intCustomerView');
}

run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['login', 'register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('login');
        }
    });
}


})();
