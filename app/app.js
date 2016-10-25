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
.config(config)
.controller(myAppCtrl);


config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
function config($locationProvider, $stateProvider, $urlRouterProvider)
{
//    var currentUser =
//        { 'name': 'Ali Adravi', 'role': 'admin', 'age': 33, 'salary': 123400 };

    // default route

    $stateProvider
        .state('homeView', {
            url: '/homeView',
            templateUrl: 'homeView/homeView.html',
            controller: 'myAppCtrl',
            controllerAs: 'vm'
        })
        .state('loginView', {
            url: '/loginView',
            templateUrl: 'loginView/loginView.html',
            controller: 'loginController',
            controllerAs: 'vm'
        })
        .state('registerView', {
            url: '/registerView',
            templateUrl: 'registerView/registerView.html',
            controller: 'registerController',
            controllerAs: 'vm'
        });

        $locationProvider.hashPrefix('!');
        $urlRouterProvider.otherwise("/homeView");

//    if(currentUser.role === "user")
//        $urlRouterProvider.otherwise('/extCustomerView');
//    if(currentUser.role === "admin")
//        $urlRouterProvider.otherwise('/intCustomerView');
}


var controllerId = 'myAppCtrl';
angular.module('myApp').controller(controllerId,
    ['userAccountService',  myAppCtrl]);
function myAppCtrl(userAccountService) {
    // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
    var vm = this;
    // Bindable properties and functions are placed on vm.
    vm.title = 'myAppCtrl';
    vm.isRegistered = false;
    vm.isLoggedIn = false;
    vm.registerUserData = {
        email: "",
        password: "",
        confirmPassword: "",
    };

    vm.loginUserData = {
        userName: "",
        password: "",
    };

    vm.registerUser = registerUser;
    vm.loginUser = loginUser;
    //vm.getValues = getValues;
    function registerUser() {
        userAccountService.registerUser(vm.registerUserData).then(function (data) {
            vm.isRegistered = true;
        }, function (error, status) {
            vm.isRegistered = false;
            console.log(status);
        });
    }
    function loginUser() {
        userAccountService.loginUser(vm.loginUserData).then(function (data) {
            vm.isLoggedIn = true;
            vm.userName = data.userName;
            vm.bearerToken = data.access_token;
        }, function (error, status) {
            vm.isLoggedIn = false;
            console.log(status);
        });
    }
//example
//    function getValues() {
//        userAccountService.getValues().then(function (data) {
//            vm.values = data;
//            console.log('back... with success');
//        });
//    }
}


})();
