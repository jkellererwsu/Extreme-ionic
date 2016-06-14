angular.module('app.controllers')

.controller('groupsCtrl', function($scope, GroupsService, $state) {
    $scope.token = window.localStorage.getItem("token");
    $scope.groups = [];
    //ContactsService.getContacts($scope.token)
    GroupsService.groups($scope.token).get(null, function(data){
        $scope.groups = data['groups'];
    }, function(data){
        console.log(data);
    });

})
    .controller('groupsShowCtrl', function($scope,GroupsService, $state, $stateParams){
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

        $scope.deleteGroup = function(){
            GroupsService.groups($scope.token).delete({group:$stateParams.groupId}, function(data){
                console.log(data);
                $state.go('menu.groups',{}, {reload: true});
            }, function(data){
                console.log(data);
            });


        }

    })
    .controller('groupsEditCtrl', function($scope, GroupsService, $state, $stateParams){
        $scope.token = window.localStorage.getItem("token");
        $scope.group = [];
        $scope.selectedPositions = {input: [], output: null};
        GroupsService.groups($scope.token).get({group:$stateParams.groupId}, function(data){
            $scope.alldata = data;
            $scope.group = data.group;
            $scope.extra=[];
            console.log($scope.group);
            $scope.extra.founded = new Date($scope.group.founded.date);
            //FIX THIS
            $scope.extra.time = new Date(1970, 0, 1, $scope.group.time,0);

        }, function(data){
            console.log(data);
        });

        $scope.editGroup = function(){
            function formatJSDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }

            $scope.updateContact = {};
            $scope.updateContact.fname = $scope.contact.contact_show.fname;
            $scope.updateContact.lname = $scope.contact.contact_show.lname;
            $scope.updateContact.email = $scope.contact.contact_show.email;
            $scope.updateContact.phone = $scope.contact.contact_show.phone;
            $scope.updateContact.address = $scope.contact.contact_show.address;
            $scope.updateContact.city = $scope.contact.contact_show.city;
            $scope.updateContact.leader_id = $scope.contact.contact_show.leader_id;
            $scope.updateContact.group_id = $scope.contact.contact_show.group_id;
            $scope.updateContact.bday = formatJSDate($scope.dates.bday);
            $scope.updateContact.anniversary = formatJSDate($scope.dates.anniversary);
            $scope.updateContact.position_list = $scope.selectedPositions.output;
            console.log($scope.updateContact);
            ContactsService1.contacts($scope.token).update({contact:$stateParams.contactId}, $scope.updateContact, function(data){
                $scope.result = data;
                console.log($scope.result);
                $state.go('menu.contactShow',{contactId: $stateParams.contactId }, {reload: true});
            }, function(data){
                console.log(data);
            });

        };

    })
    .controller('groupsCreateCtrl', function($scope, GroupsService, $state){
        $scope.token = window.localStorage.getItem("token");
        $scope.group = {};
        $scope.extra =[];
        $scope.extra.founded = new Date();
        $scope.extra.time = new Date(1970, 0, 1, 17, 30, 0);
        GroupsService.groups($scope.token).getlists(null, function(data){
            $scope.lists = data;
            console.log($scope.lists);
        }, function(data){
            console.log(data);
        });

        $scope.newGroup = function(){
            function formatJSDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }

            $scope.group.founded = formatJSDate($scope.extra.founded);
            $scope.group.time = $scope.extra.time.getHours()+':'+$scope.extra.time.getMinutes();
            console.log($scope.group);

             GroupsService.groups($scope.token).save(null, $scope.group, function(data){
                $scope.result = data;
                console.log($scope.result);
                $state.go('menu.groups', {}, {reload: true});
            }, function(data){
                console.log(data);
            });

        };
    });