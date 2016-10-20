//angular.module('myApp.welcomeView', [])
//
//.config(['$stateProvider', function ($stateProvider)
//{
//    $stateProvider
//        .state('welcomeView', {
//        url: '/welcomeView',
//        templateUrl: 'welcomeView/welcomeView.html',
//        controller: 'welcomeViewController'
//    });
//}]);

(function () {
    'use strict';

    angular
        .module('myApp')
        .config(config)
        .controller('welcomeCtrl', welcomeCtrl);


    config.$inject = ['$stateProvider'];
    function config($stateProvider)
    {
        $stateProvider
        .state('welcomeView', {
            url: '/welcomeView',
            templateUrl: 'welcomeView/welcomeView.html',
            controller: 'welcomeCtrl',
            controllerAs: 'vm'
        })
    };


    welcomeCtrl.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    };

})();
