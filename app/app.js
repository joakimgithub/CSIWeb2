(function () {
    'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'ngAnimate',
    'myApp.extCustomerView',
    'myApp.extCustomerCsisView',
    'myApp.extCsiView',
    'myApp.intCustomerView',
    'myApp.intCsiView'
])
.config(config);


config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
function config($locationProvider, $stateProvider, $urlRouterProvider)
{
//    var currentUser =
//        { 'name': 'Ali Adravi', 'role': 'admin', 'age': 33, 'salary': 123400 };

    // default route

    $stateProvider
        .state('loginView', {
            url: '/loginView',
            templateUrl: 'loginView/loginView.html',
            controller: 'loginController',
            controllerAs: 'vm'
        });

        $locationProvider.hashPrefix('!');
        $urlRouterProvider.otherwise("/homeView");

//    if(currentUser.role === "user")
//        $urlRouterProvider.otherwise('/extCustomerView');
//    if(currentUser.role === "admin")
//        $urlRouterProvider.otherwise('/intCustomerView');
}



})();
