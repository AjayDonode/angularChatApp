'use strict';
var chatApp = angular.module('chatApp');

chatApp.controller('AdminUserCtrl', function($scope, $location, $window,UserService) {
 
        //Admin User Controller (login, logout)
        $scope.logIn = function logIn(username, password) {
            console.log("Data Entered is User: "+username +" Pass: "+password);
            if (username !== undefined && password !== undefined) {
 
                UserService.logIn(username, password).success(function(data) {
                    // AuthenticationService.isLogged = true;
                    // $window.sessionStorage.token = data.token;
                    $location.path("/admin");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        }
 
        $scope.logout = function logout() {
           /* if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                $location.path("/");
            }*/
        }
    }
);