angular.module('myApp.csiView', ['ngRoute'])
    .controller('CsiMainInformationController', function ($scope, CsiMainInformationService) {

    "use strict";

//    $scope.csi = {
//        Id: '2',
//        Id_Customer: '1',
//        Id_Status: '1',
//        ClientName: 'Putte Kock',
//        ClientEmail: 'Putte.Kock@mail.se',
//        InitiatedByClient: 'SSAB Oxelösund',
//        AccountManagerName: 'Jan Lindeberg',
//        AccountManagerEmail: 'jan.lindeberg@sogeti.se',
//        Engagement: 'Nytt Intranät, EPI-Server',
//        ProjectNumber: '55678',
//        DeliveryUnit: 'Nyköping',
//        InitiationDate: '',
//        Consultants: '',
//        PlannedDateForFollowUp: '',
//        FollowedUpDate: '',
//        FollowedUpByClient: '',
//        SimpleCSI: '0',
//        Created: '',
//        CreatedBy: 'Janne',
//        Updated: '',
//        UpdatedBy: ''
//    };

    getCSIMainData();
     function getCSIMainData() {
         var servCall = CsiMainInformationService.getCSIMainData();
         servCall.then(function (data) {
             //debugger;
              $scope.csi = data;

         }, function (error) {
             $log.error('Oops! Something went wrong while fetching the data.')
         })
    }
});
