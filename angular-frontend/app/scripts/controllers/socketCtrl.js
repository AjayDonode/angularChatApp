'use strict';

angular.module('chatApp')
.controller('SocketCtrl', function ($log, $scope, $rootScope, chatSocket, messageFormatter,UserService) {
  $scope.nickName = $rootScope.user.username;
  $scope.islogged = false;
  console.log("Nick Name "+$scope.nickName);
  $scope.messageLog = 'Ready to chat!';

  $scope.loadUsers = function(){
    UserService.list().
        success(function(data) {
            $scope.contacts  = data;
      });
  };

  $scope.chatWith = function(email){
      $log.debug('sending message to ', email);
  }

  $scope.sendMessage = function() {
    $log.debug('sending message', $scope.message);
    chatSocket.emit('message', $scope.nickName, $scope.message);
    $scope.message = '';
  };


  $scope.$on('socket:broadcast', function(event, data) {
    $log.debug('got a message', event.name);
    if (!data.payload) {
      $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
      return;
    } 
    $scope.$apply(function() {
      $scope.messageLog = $scope.messageLog + messageFormatter(new Date(), data.source, data.payload);
    });
  });
});
