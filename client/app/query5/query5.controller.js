'use strict';

angular.module('firstSecondApp')
  .controller('Query5Ctrl', ['$scope','q5Service','q5MongoService',function ($scope,q5Service,q5MongoService) {
    $scope.message = 'Hello';
   var q5=this;
    q5.data=[];
    q5.mongoData=[];
    var refresh=function(){
      q5Service.getdata({controller:"Query5Ctrl"}).$promise.then(function(res){
        console.log("data received");
        q5.data=res;
      },function(err){
        console.log("error",err);
      })

    }
    refresh();


    var refresh1=function(){
      q5MongoService.getresult({controller:"Query5Ctrl"}).$promise.then(function(res){
        console.log("data received");
        q5.mongoData=res;
      },function(err){
        console.log("error",err);
      })
    }
refresh1();


  }]);
