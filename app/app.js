'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'ngAnimate',
    'myApp.welcomeView',
    'myApp.intCustomerView',
    'myApp.intCustomerCsisView',
    'myApp.intCsiView',
    'myApp.extCustomerView',
    'myApp.extCsiView'
])

.controller('appController', function($scope, $route, $stateParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$stateParams = $stateParams;
})

.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider)
    {
        $stateProvider
            .state('app', {
              abstract: true,
              // ...
              data: {
                requireLogin: true // this property will apply to all children of 'app'
              }
            })
            .state('app.dashboard', {
              // child state of `app`
              // requireLogin === true
            })

        $locationProvider.hashPrefix('!');
        $urlRouterProvider.otherwise('/extCustomerView');

    }
])


.run(function ($rootScope) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;

    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
      event.preventDefault();
      // get me a login modal!
    }
  });

});
