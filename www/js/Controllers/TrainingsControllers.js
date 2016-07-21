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
    .controller('trainingsShowCtrl', function($scope,GroupsService, $stateParams, $ionicPopup){
        $scope.token = window.localStorage.getItem("token");
        $scope.group = [];
        GroupsService.groups($scope.token).get({group:$stateParams.groupId}, function(data){
            $scope.group = data.group;
            $scope.alldata = data;
            $scope.founded = new Date($scope.group.founded.date);
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
                templateUrl: 'templates/groups/attend_create.html',
                title: 'Asistencia de ' + $scope.group.name,
                //subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.data.wifi) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data.wifi;
                            }
                        }
                    },
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });

        };

        $scope.deleteGroup = function(){
            GroupsService.groups($scope.token).delete({group:$stateParams.groupId}, function(data){
                console.log(data);
                $state.go('menu.groups',{}, {reload: true});
            }, function(data){
                console.log(data);
            });


        }

    })
    .controller('trainingsAttendCtrl', function($scope,GroupsService, $stateParams, $state){
        $scope.token = window.localStorage.getItem("token");
        $scope.attend = [];
        $scope.attend.groupid = $stateParams.groupId;
        $scope.attendcontact = [];
        $scope.attendcontact.date = new Date();
        GroupsService.groups($scope.token).getattend({group:$stateParams.groupId}, function(data){
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
            $scope.attend.contacts = $scope.attendcontact.output.concat($scope.attendcontact.output2).reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
            console.log($scope.attend);

            GroupsService.groups($scope.token).saveattend(null, $scope.attend, function(data){
                $scope.result = data;
                console.log($scope.result);
                $state.go('menu.groups', {}, {reload: true});
            }, function(data){
                console.log(data);
            });

        };


    })
