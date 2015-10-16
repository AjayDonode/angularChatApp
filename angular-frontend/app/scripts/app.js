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
    
        // route to show our basic form (/form)
        .state('chat', {
            url: '/chat',
            templateUrl: 'views/ChatMain.html',
            controller: 'SocketCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'AdminUserCtrl'
        })
 		
 		$urlRouterProvider.otherwise('/login');
    
    })
  .value('nickName', 'anonymous');
