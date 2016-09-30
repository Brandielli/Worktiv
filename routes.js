angular.module('worktiv.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    
  

      .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('home', {
    url: '/Home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('checkin', {
    url: '/checkin',
    templateUrl: 'templates/checkin.html',
    controller: 'checkinCtrl'
  })

  .state('activity', {
    url: '/activity',
    templateUrl: 'templates/activity.html',
    controller: 'activityCtrl'
  })

  .state('addActivity', {
    url: '/addActivity',
    templateUrl: 'templates/addActivity.html',
    controller: 'addActivityCtrl'
  })


  $urlRouterProvider.otherwise('/login')

  

});