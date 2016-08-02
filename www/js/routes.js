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

      .state('groupAttendCreate', {
        url: '/groupsattendcreate/{groupId:int}',
        templateUrl: 'templates/groups/attend_create.html',
        controller: 'groupsAttendCtrl'
      })

      .state('groupEdit', {
        url: '/groupsedit/{groupId:int}',
        templateUrl: 'templates/groups/edit.html',
        controller: 'groupsEditCtrl'
      })

      .state('menu.events', {
        url: '/events',
        views: {
          'side-menu21': {
            templateUrl: 'templates/events/index.html',
            controller: 'eventsCtrl'
          }
        }
      })

      .state('menu.eventShow', {
        url: '/eventshow/{eventId:int}',
        views: {
          'side-menu21': {
            templateUrl: 'templates/events/show.html',
            controller: 'eventsShowCtrl'
          }
        }
      })

      .state('eventCreate', {
        url: '/eventcreate/',
        templateUrl: 'templates/events/create.html',
        controller: 'eventsCreateCtrl'
      })

      .state('eventAttendCreate', {
        url: '/eventattendcreate/{eventId:int}',
        templateUrl: 'templates/events/attend_create.html',
        controller: 'eventsAttendCtrl'
      })

      .state('eventEdit', {
        url: '/eventedit/{eventId:int}',
        templateUrl: 'templates/events/edit.html',
        controller: 'eventsEditCtrl'
      })
      .state('menu.trainings', {
          url: '/trainings',
          views: {
              'side-menu21': {
                  templateUrl: 'templates/trainings/index.html',
                  controller: 'trainingsCtrl'
              }
          }
      })

      .state('menu.trainShow', {
          url: '/trainshow/{trainId:int}',
          views: {
              'side-menu21': {
                  templateUrl: 'templates/trainings/show.html',
                  controller: 'trainingsShowCtrl'
              }
          }
      })


      .state('trainAttendCreate', {
          url: '/trainattendcreate/{trainId:int}',
          templateUrl: 'templates/trainings/attend_create.html',
          controller: 'trainingsAttendCtrl'
      })
      .state('menu.services', {
          url: '/services',
          views: {
              'side-menu21': {
                  templateUrl: 'templates/services/index.html',
                  controller: 'servicesCtrl'
              }
          }
      })

      .state('menu.serveShow', {
          url: '/serveshow/{serveId:int}',
          views: {
              'side-menu21': {
                  templateUrl: 'templates/services/show.html',
                  controller: 'servicesShowCtrl'
              }
          }
      })


      .state('serveAttendCreate', {
          url: '/serveattendcreate/{serveId:int}',
          templateUrl: 'templates/services/attend_create.html',
          controller: 'servicesAttendCtrl'
      })


$urlRouterProvider.otherwise('/login')

  

});