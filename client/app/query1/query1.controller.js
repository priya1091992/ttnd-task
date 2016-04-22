'use strict';
angular.module('firstSecondApp')
  .controller('Query1Ctrl', ['$scope','q1Service','q1MongoService',function ($scope,q1Service, q1MongoService) {
    $scope.message = 'Hello';
    var q1=this;
    q1.data=[];
    var refresh=function(){
      q1Service.getdata({controller:"Query1Ctrl"}).$promise.then(function(res){
        console.log("data received");
        q1.data=res;
      },function(err){
        console.log("error",err);
      })

    }

    var size;
    q1.isLoading=false;
    q1.hasMore=true;
    var limit=10;
    var off =0;
    //
    //q1.pagingFunction=function(){
    //  if(!q1.isLoading && q1.hasMore){
    //    q1.isLoading = true;
    //    q1Service.getdata({off: off, limit:limit, controller:"Query1Ctrl"}).$promise.then(function(data){
    //      off =off +  data.length
    //      console.log(off);
    //      if(q1.data && q1.data.length){
    //        q1.data = q1.data.concat(data);
    //        console.log(q1.data);
    //      }else{
    //        q1.data = data;
    //        console.log(q1.data);
    //      }
    //      if(data.length < limit){
    //        q1.hasMore = false;
    //      }
    //      q1.isLoading = false;
    //    });
    //  }
    //}

   refresh();

    q1.mongoData=[];
    var refresh1=function(){
      q1MongoService.getresult1({controller:"Query1Ctrl"}).$promise.then(function(res){
        console.log("data received");
        q1.mongoData=res;
        console.log(q1.mongoData);
      },function(err){
        console.log("error",err);
      })
    }
    refresh1();


  }]);
