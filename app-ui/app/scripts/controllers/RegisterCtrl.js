'use strict';
var chatApp = angular.module('chatApp');

chatApp.controller('RegisterCtrl', function($scope,$location, UserService) {

    //load All registered Users
    loadAllUsers();


    function loadAllUsers(){
        UserService.list().
        success(function(data) {
            $scope.contacts  = data;
        });
    }

    $scope.cancel = function(){
        $location.path("/");
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
//----------------------------------------------------------------------------
    //Part of Fprm Controller
     // we will store all of our form data in this object
    $scope.formData = {};
    
    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');  
    };
});