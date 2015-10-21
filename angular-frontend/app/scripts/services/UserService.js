'use strict';
var chatApp = angular.module('chatApp');

chatApp.factory('UserService', function($http) {

    var urlBase = 'http://localhost:3000/api';
    var authBase = 'http://localhost:3000/auth'; 
    var UserService = {};
 
    UserService.logIn =  function(username, password) {
      return $http.post(authBase+'/authenticate');
    }; 

    UserService.save =  function(user) {
        return $http.put(authBase+'/register', user);
    }; 

    UserService.get = function (id ,users) {
        for (var i in users) {
            if (users[i]._id == id) {
                return users[i];
            }
        }
    }
    
    //iterate through contacts list and delete 
    //contact if found
    UserService.delete = function (id) {
         return $http.delete(urlBase+'/users/'+id , {'_id' : id});
    }

    //simply returns the contacts list
    UserService.list = function () {
        return $http.get(urlBase+'/users');
       // return users;
    }

    return UserService;

});