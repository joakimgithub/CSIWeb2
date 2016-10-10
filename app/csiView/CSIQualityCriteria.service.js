angular.module('myApp.csiView', ['ngRoute'])
    .service("CsiQualityCriteriaService", function ($http) {
    "use strict";

    this.getCSIQualityCriteria = function () {
        var url = 'http://A01C01101C//CSIService/api/CSI_QualityCriteria/CsiID/1';
        return $http.get(url).then(function (response) {
            return response.data;

        });
    }
});
