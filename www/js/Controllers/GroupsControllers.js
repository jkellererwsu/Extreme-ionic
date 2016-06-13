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
        $scope.attendance =[];
        GroupsService.groups($scope.token).get({group:$stateParams.groupId}, function(data){
            $scope.group = data.group;
            $scope.alldata = data;
            $scope.founded = new Date($scope.group.founded.date);
            angular.forEach($scope.alldata.attendance, function(item) {
                    console.log(item);
                if(item.pivot.group_id == $scope.group.id) {
                    $scope.attendance.push(item.pivot);
                }
            });
            console.log($scope.alldata);
            console.log($scope.attendance);
        }, function(data){
            console.log(data);
        });

        $scope.toggle = function (group) {
            $scope.state = group;
        };

        $scope.toggleGroup = function(group) {
            group.show = !group.show;
        };
        $scope.isGroupShown = function(group) {
            return group.show;
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
            $scope.group = data;
            $scope.dates=[];
            //$scope.dates.anniversary = new Date($scope.contact.contact_show.anniversary.date);
            console.log($scope.contact);
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
    .controller('groupsCreateCtrl', function($scope,ContactsService, ContactsService1, GroupsService, $state){
        $scope.token = window.localStorage.getItem("token");
        $scope.contact = [];
        $scope.dates=[];
        $scope.dates.anniversary = new Date();
        $scope.dates.bday = new Date();
        $scope.selectedPositions = {input: [], output: null};

        ContactsService.getLists($scope.token).success(function(data){
            $scope.lists = data;
            console.log($scope.lists);
        }).error(function(data){
            if(data =='Unauthorized'){
                window.localStorage.removeItem("token");
                $state.go('login');
            }else{
                console.log(data);
            }

        });

        $scope.newContact = function(){
            function formatJSDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }

            $scope.contact.bday = formatJSDate($scope.dates.bday);
            $scope.contact.anniversary = formatJSDate($scope.dates.anniversary);
            $scope.contact.position_list = $scope.selectedPositions.output;
            console.log($scope.contact);
            ContactsService1.contacts($scope.token).save(null, $scope.contact, function(data){
                $scope.result = data;
                console.log($scope.result);
                $state.go('menu.contacts', {}, {reload: true});
            }, function(data){
                console.log(data);
            });

        };
    });