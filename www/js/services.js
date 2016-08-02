angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('LoginService', function($q, $http) {
    return {
        loginEmail: function(data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var settings = {
                "crossDomain": true,
                "url": "http://app.extremenazarene.org/api/login",
                "method": "POST",
                "data": data
            };
            $http(settings).then(function mySuccess(response) {
                deferred.resolve(response.data);
            }, function myError(response){
                deferred.reject(response.statusText);
            });


            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;
        },

        isLoggedIn: function(data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var settings = {
                "crossDomain": true,
                "url": "/api/validate_token?token="+data,
                "method": "GET"
            };
            $http(settings).then(function mySuccess(response) {
                deferred.resolve(response.data);
            }, function myError(response){
                deferred.reject(response.statusText);
            });


            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;
        }
    }
})
    .service('RegisterService', function($resource) {
        return {
            register: function() {
                return $resource('/api/register/:reg',
                    {register: "@reg"},
                    {
                        save: {
                            method: 'POST',
                            headers: {
                                'Content-Type' : 'application/x-www-form-urlencoded',
                            },
                            transformRequest: function(obj) {
                                var str = [];
                                for(var p in obj)
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                return str.join("&");
                            }
                        }
                    }
                )
            }}

    });

