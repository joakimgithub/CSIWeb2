(function () {
    'use strict';

    // Module name is handy for logging
    var id = 'myApp(homeView)';


// Create the module and define its dependencies.
    angular.module('myApp').config(['$stateProvider', function ($stateProvider)
    {
        $stateProvider
        .state('homeView', {
            url: '/homeView',
            templateUrl: 'homeView/homeView.html',
            controller: 'homeViewController',
            controllerAs: 'vm'
        })
        $stateProvider
        .state('registerView', {
            url: '/registerView',
            templateUrl: 'homeView/registerView.html',
            controller: 'registerViewController',
            controllerAs: 'vm'
        });

    }])


// Config
    angular.module('myApp')
        .config(['$httpProvider', function ($httpProvider) {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            /**
             * converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function (obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }]);


// Execute bootstrapping code and any dependencies.
    angular.module('myApp').run(['$q', '$rootScope',
        function ($q, $rootScope) {

        }]);



// homeViewController
    var controllerId = 'homeViewController';
    angular.module('myApp').controller(controllerId,
        ['userAccountService',  homeViewController]);
    function homeViewController(userAccountService) {
        // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
        var vm = this;
        // Bindable properties and functions are placed on vm.
        vm.title = 'homeViewController';
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
