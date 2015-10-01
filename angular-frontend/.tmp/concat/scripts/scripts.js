'use strict';
angular.module('chatApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io'
]).value('nickName', 'anonymous');
'use strict';
angular.module('chatApp').controller('SocketCtrl', [
  '$log',
  '$scope',
  'chatSocket',
  'messageFormatter',
  'nickName',
  function ($log, $scope, chatSocket, messageFormatter, nickName) {
    $scope.nickName = nickName;
    $scope.islogged = true;
    console.log('Nick Name ' + $scope.nickname);
    $scope.messageLog = 'Ready to chat!';
    $scope.sendMessage = function () {
      $log.debug('sending message', $scope.message);
      chatSocket.emit('message', $scope.username, $scope.message);
      $scope.message = '';
    };
    $scope.createUser = function () {
      console.log($scope.username);
      $scope.nickName = $scope.username;
      $scope.islogged = false;
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