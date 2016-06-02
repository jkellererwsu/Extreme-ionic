angular.module('app.controllers')

.controller('contactsCtrl', function($scope, ContactsService, $state) {
    $scope.token = window.localStorage.getItem("token");
    $scope.contacts = [];
    ContactsService.getContacts($scope.token).success(function(data){
        $scope.contacts = data['contacts'];
    }).error(function(data){
        if(data =='Unauthorized'){
            window.localStorage.removeItem("token");
            $state.go('login');
        }else{
            //console.log(data);
        }

    });
})
    .controller('contactsShowCtrl', function($scope,ContactsService, $state, $stateParams){
        $scope.token = window.localStorage.getItem("token");
        $scope.contact = [];
        ContactsService.getContact($scope.token, $stateParams.contactId).success(function(data){
            $scope.contact = data;
            $scope.anniversary = new Date($scope.contact.contact_show.anniversary.date);
            $scope.bday = new Date($scope.contact.contact_show.bday.date);
            console.log($scope.contact);
        }).error(function(data){
            if(data =='Unauthorized'){
                window.localStorage.removeItem("token");
                $state.go('login');
            }else{
                console.log(data);
            }

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

        $scope.deleteContact = function(){
            ContactsService.deleteContact($scope.token, $stateParams.contactId).success(function(data){
                console.log(data);
                $state.go('menu.contacts',{}, {reload: true});
            }).error(function(data){
                if(data =='Unauthorized'){
                    window.localStorage.removeItem("token");
                    $state.go('login');
                }else{
                    console.log(data);
                }

            });

        }

    })
    .controller('contactsEditCtrl', function($scope,ContactsService, GroupsService, $state, $stateParams){
        $scope.token = window.localStorage.getItem("token");
        $scope.contact = [];
        $scope.selectedPositions = {input: [], output: null};
        $scope.postest = null;
        ContactsService.getContact($scope.token, $stateParams.contactId).success(function(data){
            $scope.contact = data;
            $scope.dates=[];
            $scope.dates.anniversary = new Date($scope.contact.contact_show.anniversary.date);
            $scope.dates.bday = new Date($scope.contact.contact_show.bday.date);
            angular.forEach($scope.contact.positions, function(item, key) {
                    $scope.selectedPositions.input[key] = item.title;
            });
            console.log($scope.contact);
        }).error(function(data){
            if(data =='Unauthorized'){
                window.localStorage.removeItem("token");
                $state.go('login');
            }else{
                console.log(data);
            }

        });

        $scope.editContact = function(){
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
            ContactsService.updateContact($scope.token, $stateParams.contactId, $scope.updateContact).success(function(data){
                $scope.result = data;
                console.log($scope.result);
                $state.go('menu.contactShow',{contactId: $stateParams.contactId }, {reload: true});
            }).error(function(data){
                if(data =='Unauthorized'){
                    window.localStorage.removeItem("token");
                    $state.go('login');
                }else{
                    console.log(data);
                }

            });
        };

    })
    .controller('contactsCreateCtrl', function($scope,ContactsService, GroupsService, $state){
        $scope.token = window.localStorage.getItem("token");
        $scope.contact = {};
        $scope.dates=[];
        $scope.dates.anniversary = new Date();
        $scope.dates.bday = new Date();
        $scope.selectedPositions = {input: [], output: null};

        ContactsService.getLists($scope.token).success(function(data){
            $scope.lists = data;
            console.log($scope.contact);
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
            ContactsService.storeContact($scope.token, $scope.contact).success(function(data){
                $scope.result = data;
                console.log($scope.result);
                $state.go('menu.contacts', {}, {reload: true});
            }).error(function(data){
                if(data =='Unauthorized'){
                    window.localStorage.removeItem("token");
                    $state.go('login');
                }else{
                    console.log(data);
                }

            });
        };
    });