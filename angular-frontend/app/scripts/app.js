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
        .state('/', {
            url: '/',
            templateUrl: 'views/search/search.html',
            controller: 'UserCtrl'
        })
         .state('chat', {
            url: '/chat',
            templateUrl: 'views/ChatMain.html',
            controller: 'SocketCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/Login.html',
            controller: 'UserCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/UserLogin/Register.html',
            controller: 'RegisterCtrl'
        })
//----------------------------------------------------------
   // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'views/Register/RegisterForm.html',
            controller: 'RegisterCtrl'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.profile', {
            url: '/profile',
            templateUrl: 'views/Register/Form_Profile.html'
        })
        
        // url will be /form/interests
        .state('form.interests', {
            url: '/interests',
            templateUrl: 'views/Register/Form_Interest.html'
        })
        
        // url will be /form/payment
        .state('form.payment', {
            url: '/payment',
            templateUrl: 'views/Register/Form_Payment.html'
        });

 		
 		$urlRouterProvider.otherwise('/');
    
    })
  .value('nickName', 'anonymous'); //the way to use global variables (constants)
