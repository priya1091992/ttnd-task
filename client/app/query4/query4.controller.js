'use strict';

angular.module('firstSecondApp')
  .controller('Query4Ctrl', ['$scope','q4Service','q4MongoService',function ($scope,q4Service, q4MongoService) {
    $scope.message = 'Hello';
    var q4=this;
    q4.data=[];
    var refresh=function(){
      q4Service.getdata({controller:"Query4Ctrl"}).$promise.then(function(res){
        console.log("data received");
        q4.data=res;
      },function(err){
        console.log("error",err);
      })

    }
    refresh();

    q4.mongoData=[];
    var refresh1=function(){
      q4MongoService.getresult4({controller:"Query4Ctrl"}).$promise.then(function(res){
        console.log("data received");
        q4.mongoData=res;
      },function(err){
        console.log("error",err);
      })
    }
    refresh1();

  }]);
