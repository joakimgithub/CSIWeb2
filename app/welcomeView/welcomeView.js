angular.module('myApp.welcomeView', [])

.config(['$stateProvider', function ($stateProvider)
{
    $stateProvider
        .state('welcomeView', {
        url: '/welcomeView',
        templateUrl: 'welcomeView/welcomeView.html',
        controller: 'welcomeViewController'
    });
}]);
