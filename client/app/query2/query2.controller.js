'use strict';

angular.module('firstSecondApp')
  .controller('Query2Ctrl', ['$scope','q2Service','q2MongoService1',function ($scope,q2Service, q2MongoService1) {
    $scope.message = 'Hello';
    var q2=this;
    q2.data=[];
    var refresh=function(){
      q2Service.getdata({controller:"Query2Ctrl"}).$promise.then(function(res){
        console.log("data received");
        q2.data=res;

      },function(err){
        console.log("error",err);
      })

    }
    refresh();

    q2.mongoData=[];
    var refresh1=function(){
      q2MongoService1.getresult2({controller:"Query2Ctrl"}).$promise.then(function(res){
        console.log("data received");
        q2.mongoData=res;
      },function(err){
        console.log("error",err);
      })
    }
    refresh1();

  }]);
