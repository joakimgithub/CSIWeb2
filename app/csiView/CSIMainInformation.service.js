angular.module('myApp.csiView', ['ngRoute'])
    .service("CsiMainInformationService", function ($http) {
    "use strict";

    this.getCSIMainData = function () {
        var url = 'http://A01C01101C//CSIService/api/CSIs/1';
        return $http.get(url).then(function (response) {
            return response.data;

        });
    }
});
