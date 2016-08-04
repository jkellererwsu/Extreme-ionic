angular.module('app.services')

.service('ContactsService', function($q, $http) {
    return {
        getLists: function (token) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var settings = {
                "crossDomain": true,
                "url": "http://app.extremenazarene.org/api/contacts/create/?token=" + token,
                "method": "GET"
            };
            $http(settings).then(function mySuccess(response) {
                deferred.resolve(response.data);
            }, function myError(response) {
                deferred.reject(response.statusText);
            });


            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;
        }
    }
})
    .service('ContactsService1', function($resource) {
        return {
            contacts: function(token) {
                return $resource('http://app.extremenazarene.org/api/contacts/:contact',
        {contact: "@contact"},
        { get: {
                method: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + token
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