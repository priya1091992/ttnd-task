'use strict';

angular.module('firstSecondApp')
  .controller('Query3Ctrl', ['$scope','q3Service','q3MongoService',function ($scope,q3Service, q3MongoService) {
    $scope.message = 'Hello';
    var q3=this;
    q3.data1=[];
    var refresh=function(){
      q3Service.getdata({controller:"Query3Ctrl"}).$promise.then(function(res){
        console.log("data received");
        q3.data1=res;
      },function(err){
        console.log("error",err);
      })

    }
    refresh();

    q3.mongoData=[];
    var refresh1=function(){
      q3MongoService.getresult3({controller:"Query3Ctrl"}).$promise.then(function(res){
        console.log("data received");
        q3.mongoData=res;
      },function(err){
        console.log("error",err);
      })
    }
    refresh1();

  }]);
