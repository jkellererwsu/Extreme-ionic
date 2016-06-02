angular.module('app.services')

.service('ContactsService', function($q, $http) {
    return {
        getContacts: function (token) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var settings = {
                "crossDomain": true,
                "url": "/api/api/contacts/?token=" + token,
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
        },
        getContact: function (token, contactId) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var settings = {
                "crossDomain": true,
                "url": "/api/api/contacts/"+contactId+"/?token=" + token,
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
        },
        getLists: function (token) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var settings = {
                "crossDomain": true,
                "url": "/api/api/contacts/create/?token=" + token,
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
        },
        storeContact: function(token, data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var settings = {
                method: "POST",
                url: "/api/api/contacts/",
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' +token
                },
                data: data
            };
            console.log(settings);
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
        updateContact: function (token, contactId, contactData) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var settings = {
                "async":true,
                "crossDomain": true,
                "url": "/api/api/contacts/"+contactId+"/?token=" + token,
                "method": "PATCH",
                "data": contactData
            };
            console.log(settings);
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