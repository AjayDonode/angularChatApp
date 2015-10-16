'use strict';
var chatApp = angular.module('chatApp');

angular.module('chatApp')
    .service('AuthenticationService', function() {
    var auth = {
        isLogged: false
    }
 
    return auth;
});
chatApp.service('UserService', function($http) {
    
       /*$scope.logIn =  function(username, password) {
            return $http.post(options.api.base_url + '/login', {username: username, password: password});
        }
 
        $scope.logOut= function($http) {
 
        }*/
    
});