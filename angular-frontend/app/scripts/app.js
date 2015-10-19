'use strict';

angular
  .module('chatApp', [
  	'ui.router',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ngAnimate'
    
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
         .state('chat', {
            url: '/chat',
            templateUrl: 'views/ChatMain.html',
            controller: 'SocketCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'UserCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/UserLogin/Register.html',
            controller: 'RegisterCtrl'
        })
 		
 		$urlRouterProvider.otherwise('/login');
    
    })
  .value('nickName', 'anonymous'); //the way to use global variables (constants)
