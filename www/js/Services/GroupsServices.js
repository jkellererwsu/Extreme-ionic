angular.module('app.services')

    .service('GroupsService', function($resource) {
        return {
            groups: function(token) {
                return $resource('http://app.extremenazarene.org/api/groups/:group',
                    {contact: "@group"},
                    { get: {
                        method: 'GET',
                        headers: {
                            'Authorization' : 'Bearer ' + token
                        }
                    },
                        getlists: {
                            method: 'GET',
                            url:'http://app.extremenazarene.org/api/groups/create',
                            headers: {
                                'Authorization' : 'Bearer ' + token
                            }
                        },
                        getattend: {
                            method: 'GET',
                            url:'http://app.extremenazarene.org/api/groups/createattend/:group',
                            headers: {
                                'Authorization' : 'Bearer ' + token
                            }
                        },
                        saveattend: {
                            method: 'POST',
                            url:'http://app.extremenazarene.org/api/groups/createattend/:group',
                            headers: {
                                'Content-Type' : 'application/x-www-form-urlencoded',
                                'Authorization' : 'Bearer ' + token
                            },
                            transformRequest: function(obj) {
                                var str = [];
                                for(var p in obj)
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                return str.join("&");
                            }
                        },
                        delete: {
                            method: 'DELETE',
                            headers: {
                                'Authorization' : 'Bearer ' + token
                            }
                        },
                        save: {
                            method: 'POST',
                            headers: {
                                'Content-Type' : 'application/x-www-form-urlencoded',
                                'Authorization' : 'Bearer ' + token
                            },
                            transformRequest: function(obj) {
                                var str = [];
                                for(var p in obj)
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                return str.join("&");
                            }
                        },
                        update: {
                            method: 'PATCH',
                            headers: {
                                'Authorization' : 'Bearer ' + token
                            }
                        },
                    }
                )
            }}

    });