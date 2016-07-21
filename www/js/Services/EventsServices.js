angular.module('app.services')

    .service('EventsService', function($resource) {
        return {
            events: function(token) {
                return $resource('/api/events/:event',
                    {contact: "@event"},
                    { get: {
                        method: 'GET',
                        headers: {
                            'Authorization' : 'Bearer ' + token
                        }
                    },
                        getlists: {
                            method: 'GET',
                            url:'/api/events/create',
                            headers: {
                                'Authorization' : 'Bearer ' + token
                            }
                        },
                        getattend: {
                            method: 'GET',
                            url:'/api/events/createattend/:event',
                            headers: {
                                'Authorization' : 'Bearer ' + token
                            }
                        },
                        saveattend: {
                            method: 'POST',
                            url:'/api/events/createattend/',
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