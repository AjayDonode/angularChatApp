'use strict';

angular.module('chatApp')
.controller('SocketCtrl', function ($log, $scope, chatSocket, messageFormatter, nickName) {
  $scope.nickName = nickName;
  $scope.islogged = true;
  console.log("Nick Name "+$scope.nickname);
  $scope.messageLog = 'Ready to chat!';

  

  $scope.sendMessage = function() {

    $log.debug('sending message', $scope.message);
    chatSocket.emit('message', $scope.username, $scope.message);
    $scope.message = '';
  };

  $scope.createUser = function() {
    console.log($scope.username);
    $scope.nickName = $scope.username;
    $scope.islogged = false;
  }

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
