'use strict';
var chatApp = angular.module('chatApp');

chatApp.controller('RegisterCtrl', function($scope, UserService) {

    //load All registered Users
    loadAllUsers();


    function loadAllUsers(){
        UserService.list().
        success(function(data) {
            $scope.contacts  = data;
        });
    }

    $scope.saveContact = function () {
        UserService.save($scope.newcontact)
            .success(function(data) {
            $scope.successmessage  = data.username;
        });
        $scope.newcontact = {};
        loadAllUsers();
    }

    $scope.delete = function (id) {

        UserService.delete(id)
            .success(function(data) {
                $scope.successmessage  = data.username;
            });

        if ($scope.newcontact._id == id) $scope.newcontact = {};
    }

    $scope.edit = function (id) {
        $scope.newcontact = angular.copy(UserService.get(id,$scope.contacts));
    }
});