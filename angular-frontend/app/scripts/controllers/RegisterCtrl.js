'use strict';
var chatApp = angular.module('chatApp');

chatApp.controller('RegisterCtrl', function($scope, UserService) {

    $scope.contacts = UserService.list();

    $scope.saveContact = function () {
        UserService.save($scope.newcontact);
        $scope.newcontact = {};
    }

    $scope.delete = function (id) {

        UserService.delete(id);
        if ($scope.newcontact.id == id) $scope.newcontact = {};
    }

    $scope.edit = function (id) {
        $scope.newcontact = angular.copy(UserService.get(id));
    }
});