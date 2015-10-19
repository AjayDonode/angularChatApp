'use strict';
var chatApp = angular.module('chatApp');

chatApp.controller('UserCtrl', function($scope, $location, $window,UserService) {
 
        //Admin User Controller (login, logout)
        $scope.logIn = function logIn(username, password) {
            console.log("Data Entered is User: "+username +" Pass: "+password);
            if (username !== undefined && password !== undefined) {
                //console.log("Total Users are "+UserService.all());
                UserService.logIn(username, password)
                .success(function(data) {
                    $scope.users = data;
                    console.log(data);
                   // $location.path("/chat");
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