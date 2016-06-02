angular.module('app.services')

    .service('GroupsService', function($q, $http) {
        return {
            getGroups: function (token) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                var settings = {
                    "crossDomain": true,
                    "url": "http://app.extremenazarene.org/api/groups/?token=" + token,
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
    });