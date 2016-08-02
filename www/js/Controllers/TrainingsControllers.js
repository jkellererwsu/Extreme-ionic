angular.module('app.controllers')

.controller('trainingsCtrl', function($scope, TrainingsService) {
    $scope.token = window.localStorage.getItem("token");
    $scope.trainings = [];
    //ContactsService.getContacts($scope.token)
    TrainingsService.trainings($scope.token).get(null, function(data){
        $scope.trainings = data['trainings'];
        $scope.trainings2 = data['trainings'];
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
    .controller('trainingsShowCtrl', function($scope,TrainingsService, $stateParams, $ionicPopup){
        $scope.token = window.localStorage.getItem("token");
        $scope.group = [];
        TrainingsService.trainings($scope.token).get({train:$stateParams.trainId}, function(data){
            $scope.train = data.train;
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
                templateUrl: 'templates/trainings/attend_create.html',
                title: 'Asistencia de ' + $scope.train.name,
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
    .controller('trainingsAttendCtrl', function($scope,TrainingsService, $stateParams, $state){
        $scope.token = window.localStorage.getItem("token");
        $scope.attend = [];
        $scope.attend.trainid = $stateParams.trainId;
        $scope.attendcontact = [];
        $scope.attendcontact.date = new Date();
        TrainingsService.trainings($scope.token).getattend({train:$stateParams.trainId}, function(data){
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
            $scope.attend.contacts = $scope.attendcontact.output;
            console.log($scope.attend);

            TrainingsService.trainings($scope.token).saveattend(null, $scope.attend, function(data){
                $scope.result = data;
                console.log($scope.result);
                $state.go('menu.trainings', {}, {reload: true});
            }, function(data){
                console.log(data);
            });

        };


    })
