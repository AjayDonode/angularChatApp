'use strict';
var chatApp = angular.module('chatApp');

chatApp.controller('UserCtrl', function($scope, $rootScope, $location, $window,UserService) {
 
        //Admin User Controller (login, logout)
        $scope.logIn = function(email, password) {
            if (email !== undefined && password !== undefined) {
                //console.log("Total Users are "+UserService.all());
                UserService.logIn(email, password)
                .success(function(data) {
                    if(data.success){
                        $scope.user = data.data;
                        $rootScope.user = $scope.user;
                        $location.path("/chat");
                    }
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        }

        $scope.register = function() {
           $location.path("/register");
        }

        $scope.logout = function() {
           /* if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                $location.path("/");
            }*/
        }

    });