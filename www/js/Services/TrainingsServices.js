angular.module('app.services')

    .service('TrainingsService', function($resource) {
        return {
            trainings: function(token) {
                return $resource('http://app.extremenazarene.org/api/trainings/:train',
                    {contact: "@train"},
                    { get: {
                        method: 'GET',
                        headers: {
                            'Authorization' : 'Bearer ' + token
                        }
                    },
                        getlists: {
                            method: 'GET',
                            url:'http://app.extremenazarene.org/api/trainings/create',
                            headers: {
                                'Authorization' : 'Bearer ' + token
                            }
                        },
                        getattend: {
                            method: 'GET',
                            url:'http://app.extremenazarene.org/api/trainings/createattend/:train',
                            headers: {
                                'Authorization' : 'Bearer ' + token
                            }
                        },
                        saveattend: {
                            method: 'POST',
                            url:'http://app.extremenazarene.org/api/trainings/createattend/:train',
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