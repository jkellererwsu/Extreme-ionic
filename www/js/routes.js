angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/home',
        views:{
          'side-menu21': {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
          }
        }

  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/auth/login.html',
    controller: 'loginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/auth/register.html',
    controller: 'registerCtrl'
  })

  .state('forgotPassword', {
    url: '/reset',
    templateUrl: 'templates/auth/reset.html',
    controller: 'forgotPasswordCtrl'
  })
//CONTACTS
  .state('menu.contacts', {
    url: '/contacts',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contacts/index.html',
        controller: 'contactsCtrl'
      }
    }
  })

  .state('menu.contactShow', {
      url: '/contactsshow/{contactId:int}',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contacts/show.html',
        controller: 'contactsShowCtrl'
      }
    }
  })

  .state('contactCreate', {
    url: '/contactscreate/',
    templateUrl: 'templates/contacts/create.html',
    controller: 'contactsCreateCtrl'
  })

  .state('contactEdit', {
    url: '/contactsedit/{contactId:int}',
    templateUrl: 'templates/contacts/edit.html',
    controller: 'contactsEditCtrl'
  })
  //GROUPS
      .state('menu.groups', {
        url: '/groups',
        views: {
          'side-menu21': {
            templateUrl: 'templates/groups/index.html',
            controller: 'groupsCtrl'
          }
        }
      })

      .state('menu.groupShow', {
        url: '/groupshow/{groupId:int}',
        views: {
          'side-menu21': {
            templateUrl: 'templates/groups/show.html',
            controller: 'groupsShowCtrl'
          }
        }
      })

      .state('groupCreate', {
        url: '/groupscreate/',
        templateUrl: 'templates/groups/create.html',
        controller: 'groupsCreateCtrl'
      })

      .state('groupEdit', {
        url: '/groupsedit/{groupId:int}',
        templateUrl: 'templates/groups/edit.html',
        controller: 'groupsEditCtrl'
      })

$urlRouterProvider.otherwise('/login')

  

});