"use strict";angular.module("chatApp",["ngCookies","ngResource","ngSanitize","btford.socket-io"]).value("nickName","anonymous"),angular.module("chatApp").controller("SocketCtrl",["$log","$scope","chatSocket","messageFormatter","nickName",function(a,b,c,d,e){b.nickName=e,b.islogged=!0,console.log("Nick Name "+b.nickname),b.messageLog="Ready to chat!",b.sendMessage=function(){a.debug("sending message",b.message),c.emit("message",b.username,b.message),b.message=""},b.createUser=function(){console.log(b.username),b.nickName=b.username,b.islogged=!1},b.$on("socket:broadcast",function(c,e){return a.debug("got a message",c.name),e.payload?void b.$apply(function(){b.messageLog=b.messageLog+d(new Date,e.source,e.payload)}):void a.error("invalid message","event",c,"data",JSON.stringify(e))})}]),angular.module("chatApp").factory("chatSocket",["socketFactory",function(a){var b=a();return b.forward("broadcast"),b}]),angular.module("chatApp").value("messageFormatter",function(a,b,c){return a.toLocaleTimeString()+" - "+b+" - "+c+"\n"}),function(){angular.module("chatApp").directive("chatBox",function(){return{restrict:"E",template:'<textarea style="width: 100%; height: 200px" ng-disable="true" ng-model="messageLog"></textarea>',controller:["$scope","$element",function(a,b){a.$watch("messageLog",function(){var a=b[0].children[0];a.scrollTop=a.scrollHeight})}]}})}();