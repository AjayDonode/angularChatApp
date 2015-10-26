'use strict';
angular.module('chatApp', [
  'ui.router',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ngAnimate'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('chat', {
      url: '/chat',
      templateUrl: 'views/ChatMain.html',
      controller: 'SocketCtrl'
    }).state('login', {
      url: '/login',
      templateUrl: 'views/Login.html',
      controller: 'UserCtrl'
    }).state('register', {
      url: '/register',
      templateUrl: 'views/UserLogin/Register.html',
      controller: 'RegisterCtrl'
    }).state('form', {
      url: '/form',
      templateUrl: 'views/Register/RegisterForm.html',
      controller: 'RegisterCtrl'
    }).state('form.profile', {
      url: '/profile',
      templateUrl: 'views/Register/Form_Profile.html'
    }).state('form.interests', {
      url: '/interests',
      templateUrl: 'views/Register/Form_Interest.html'
    }).state('form.payment', {
      url: '/payment',
      templateUrl: 'views/Register/Form_Payment.html'
    });
    $urlRouterProvider.otherwise('/login');
  }
]).value('nickName', 'anonymous');
//the way to use global variables (constants)
'use strict';
angular.module('chatApp').factory('chatSocket', [
  'socketFactory',
  function (socketFactory) {
    var socket = socketFactory();
    socket.forward('broadcast');
    return socket;
  }
]);
'use strict';
angular.module('chatApp').value('messageFormatter', function (date, nick, message) {
  return date.toLocaleTimeString() + ' - ' + nick + ' - ' + message + '\n';
});
'use strict';
var chatApp = angular.module('chatApp');
chatApp.factory('UserService', [
  '$http',
  function ($http) {
    var urlBase = 'http://localhost:3000/api';
    var authBase = 'http://localhost:3000/auth';
    var UserService = {};
    UserService.logIn = function (email, password) {
      return $http.post(authBase + '/authenticate', {
        'email': email,
        'password': password
      });
    };
    UserService.save = function (user) {
      return $http.put(authBase + '/register', user);
    };
    UserService.get = function (id, users) {
      for (var i in users) {
        if (users[i]._id == id) {
          return users[i];
        }
      }
    };
    //iterate through contacts list and delete 
    //contact if found
    UserService.delete = function (id) {
      return $http.delete(urlBase + '/users/' + id, { '_id': id });
    };
    //simply returns the contacts list
    UserService.list = function () {
      return $http.get(urlBase + '/users');  // return users;
    };
    return UserService;
  }
]);
'use strict';
angular.module('chatApp').controller('SocketCtrl', [
  '$log',
  '$scope',
  '$rootScope',
  'chatSocket',
  'messageFormatter',
  'UserService',
  function ($log, $scope, $rootScope, chatSocket, messageFormatter, UserService) {
    $scope.nickName = $rootScope.user.username;
    $scope.islogged = false;
    console.log('Nick Name ' + $scope.nickName);
    $scope.messageLog = 'Ready to chat!';
    $scope.loadUsers = function () {
      UserService.list().success(function (data) {
        $scope.contacts = data;
      });
    };
    $scope.chatWith = function (email) {
      $log.debug('sending message to ', email);
    };
    $scope.sendMessage = function () {
      $log.debug('sending message', $scope.message);
      chatSocket.emit('message', $scope.nickName, $scope.message);
      $scope.message = '';
    };
    $scope.$on('socket:broadcast', function (event, data) {
      $log.debug('got a message', event.name);
      if (!data.payload) {
        $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
        return;
      }
      $scope.$apply(function () {
        $scope.messageLog = $scope.messageLog + messageFormatter(new Date(), data.source, data.payload);
      });
    });
  }
]);
'use strict';
var chatApp = angular.module('chatApp');
chatApp.controller('UserCtrl', [
  '$scope',
  '$rootScope',
  '$location',
  '$window',
  'UserService',
  function ($scope, $rootScope, $location, $window, UserService) {
    //Admin User Controller (login, logout)
    $scope.logIn = function (email, password) {
      if (email !== undefined && password !== undefined) {
        //console.log("Total Users are "+UserService.all());
        UserService.logIn(email, password).success(function (data) {
          if (data.success) {
            $scope.user = data.data;
            $rootScope.user = $scope.user;
            $location.path('/chat');
          }
        }).error(function (status, data) {
          console.log(status);
          console.log(data);
        });
      }
    };
    $scope.register = function () {
      $location.path('/register');
    };
    $scope.logout = function () {
    };
  }
]);
'use strict';
var chatApp = angular.module('chatApp');
chatApp.controller('RegisterCtrl', [
  '$scope',
  '$location',
  'UserService',
  function ($scope, $location, UserService) {
    //load All registered Users
    loadAllUsers();
    function loadAllUsers() {
      UserService.list().success(function (data) {
        $scope.contacts = data;
      });
    }
    $scope.cancel = function () {
      $location.path('/');
    };
    $scope.saveContact = function () {
      UserService.save($scope.newcontact).success(function (data) {
        $scope.successmessage = data.username;
      });
      $scope.newcontact = {};
      loadAllUsers();
    };
    $scope.delete = function (id) {
      UserService.delete(id).success(function (data) {
        $scope.successmessage = data.username;
      });
      if ($scope.newcontact._id == id)
        $scope.newcontact = {};
    };
    $scope.edit = function (id) {
      $scope.newcontact = angular.copy(UserService.get(id, $scope.contacts));
    };
    //----------------------------------------------------------------------------
    //Part of Fprm Controller
    // we will store all of our form data in this object
    $scope.formData = {};
    // function to process the form
    $scope.processForm = function () {
      alert('awesome!');
    };
  }
]);
(function () {
  'use strict';
  angular.module('chatApp').directive('chatBox', function () {
    return {
      restrict: 'E',
      template: '<textarea style="width: 100%; height: 200px" ng-disable="true" ng-model="messageLog"></textarea>',
      controller: [
        '$scope',
        '$element',
        function ($scope, $element) {
          $scope.$watch('messageLog', function () {
            var textArea = $element[0].children[0];
            textArea.scrollTop = textArea.scrollHeight;
          });
        }
      ]
    };
  });
}());