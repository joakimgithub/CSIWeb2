angular.module('myApp.csiView', ['ngRoute'])
    .controller('CsiQualityCriteriaController', function ($scope, CsiQualityCriteriaService) {

    "use strict";

    //$scope.csiQualityCriterias = [{QualityCriteria: "Leverera i tid", Importance: 4, Value: 4}, {QualityCriteria: "Vara lyhörd för användarens åsikter", //Importance: 4, Value: 5}];


    getCSIQCData();
     function getCSIQCData() {
         var servCall = CsiQualityCriteriaService.getCSIQualityCriteria();
         servCall.then(function (data) {
             //debugger;
             $scope.csiQualityCriterias = data;

         }, function (error) {
             $log.error('Oops! Something went wrong while fetching the data.')
         })
    }
});
