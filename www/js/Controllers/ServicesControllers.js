angular.module('app.controllers')

.controller('servicesCtrl', function($scope, ServicesService) {
    $scope.token = window.localStorage.getItem("token");
    $scope.services = [];
    //ContactsService.getContacts($scope.token)
    ServicesService.services($scope.token).get(null, function(data){
        $scope.services = data['services'];
        $scope.alldata =data;
        console.log(data);
    }, function(data){
        console.log(data);
    });

    $scope.toggle = function (group) {
        if($scope.state == group){
            $scope.state = null;
        }else {
            $scope.state = group;
        }
    };

})
    .controller('servicesShowCtrl', function($scope,ServicesService, $stateParams, $ionicPopup){
        $scope.token = window.localStorage.getItem("token");
        $scope.serve = [];
        ServicesService.services($scope.token).get({serve:$stateParams.serveId}, function(data){
            $scope.serve = data.serve;
            $scope.alldata = data;
            console.log($scope.alldata);
        }, function(data){
            console.log(data);
        });

        $scope.toggle = function (group) {
            if($scope.state == group){
                $scope.state = null;
            }else {
                $scope.state = group;
            }
        };

        $scope.createAttendance = function(){
            $scope.data={};

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/services/attend_create.html',
                title: 'Asistencia de ' + $scope.serve.name,
                //subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                    },
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });

        };

        $scope.deleteTrain = function(){
            TrainingsService.trainings($scope.token).delete({train:$stateParams.trainId}, function(data){
                console.log(data);
                $state.go('menu.trainings',{}, {reload: true});
            }, function(data){
                console.log(data);
            });


        }

    })
    .controller('servicesAttendCtrl', function($scope,ServicesService, $stateParams, $state){
        $scope.token = window.localStorage.getItem("token");
        $scope.attend = [];
        $scope.attend.service_id = $stateParams.serveId;
        $scope.attendcontact = [];
        $scope.attendcontact.date = new Date();
        ServicesService.services($scope.token).getattend({serve:$stateParams.serveId}, function(data){
            $scope.alldata = data;

            console.log($scope.alldata);
        }, function(data){
            console.log(data);
        });


        $scope.newAttend = function(){
            function formatJSDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }

            $scope.attend.date = formatJSDate($scope.attendcontact.date);
            //the reduce section removes duplicates
            console.log($scope.attend);

            ServicesService.services($scope.token).saveattend(null, $scope.attend, function(data){
                $scope.result = data;
                console.log($scope.result);
                $state.go('menu.services', {}, {reload: true});
            }, function(data){
                console.log(data);
            });

        };


    })
