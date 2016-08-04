angular.module('app.controllers', [])

.controller('menuCtrl', function($scope, $state){
$scope.logout = function(){
    window.localStorage.removeItem("token");
    $state.go('login');
}
})

.controller('loginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.token = window.localStorage.getItem("token");
    if(angular.isString($scope.token) ) {
        LoginService.isLoggedIn($scope.token).success(function(data){
            $state.go('menu.home');
        }).error(function(data){
            window.localStorage.removeItem("token");
        })
    }
    $scope.data = {};
    $scope.login = function(){
        LoginService.loginEmail($scope.data).success(function(data){
            window.localStorage.setItem('token',data['token']);
            $state.go('menu.home');
        }).error(function(data){
            var alertPopup = $ionicPopup.alert({
                title:'Login Failed!',
                template:'Please check your credentials!'
            });
        });
    }
})

.controller('homeCtrl', function($scope) {

})
   
.controller('registerCtrl', function(RegisterService, $scope, $state) {
    $scope.user = [];
    RegisterService.register().get(null, function(data){
        $scope.result = data;
        console.log($scope.result);
    }, function(data){
        console.log(data);
    });

    $scope.newUser = function(){
        console.log($scope.user);
            RegisterService.register().save(null, $scope.user, function (data) {
                $scope.result = data;
                console.log($scope.result);
                $state.go('login', {}, {reload: true});
            }, function (data) {
                console.log(data);
            });

    };
})
   
.controller('forgotPasswordCtrl', function($scope) {

});
   

 