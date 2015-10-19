'use strict';
var chatApp = angular.module('chatApp');

chatApp.factory('UserService', function($http) {

     //to create unique contact id
    var uid = 1;    
    //contacts array to hold list of all contacts
    var users = [{
            'id': 0,
            'name': 'Viral',
            'email': 'hello@gmail.com',
            'password': 'testpass',           
            'phone': '123-2343-44',
            'profession': 'Engineer',
            'age': '20',
    }];

    var urlBase = 'http://localhost:3000/api';
    var UserService = {};
    // $scope.logIn = function logIn(username, password) {
        
    //         console.log("Able to call this method");
    //     }
       /*$scope.logIn =  function(username, password) {
            return $http.post(options.api.base_url + '/login', {username: username, password: password});
        }
 
        $scope.logOut= function($http) {
 
        }*/
 
    UserService.logIn =  function(username, password) {
      return $http.get(urlBase+'/users');
    }; 


   UserService.save =  function(user) {
      if (user.id == null) {
            //if this is new contact, add it in contacts array
            user.id = uid++;
            users.push(user);
        } else {
            //for existing contact, find this contact using id
            //and update it.
            for (var i in users) {
                if (users[i].id == user.id) {
                    users[i] = user;
                }
            }
        }
    }; 

 //simply search contacts list for given id
    //and returns the contact object if found
    UserService.get = function (id) {
        for (var i in users) {
            if (users[i].id == id) {
                return users[i];
            }
        }

    }
    
    //iterate through contacts list and delete 
    //contact if found
    UserService.delete = function (id) {
        for (var i in users) {
            if (users[i].id == id) {
                users.splice(i, 1);
            }
        }
    }

    //simply returns the contacts list
    UserService.list = function () {
        return users;
    }

    return UserService;

});