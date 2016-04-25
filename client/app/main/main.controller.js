'use strict';

angular.module('firstSecondApp')
  .controller('MainCtrl', ['$http','migrationTask', function ($http, migrationTask) {
    var migrateHome=this;
    migrateHome.flagvalue=0;
    migrateHome.reversevalue=0;
    migrateHome.hell=false;
    migrateHome.reverse = 0;

    migrateHome.migration=function() {
      migrateHome.flagvalue = 1;
      migrateHome.time;
      var success1=function(res){
        console.log(res,"in response");
        if(res.length>=1){
          console.log("already migrated");
          migrateHome.flagvalue = 0;
          migrateHome.reverse = 1;
          migrateHome.hell=true;
        }
        else{
          var success = function (res) {
            console.log('inside success : ', res);
            migrateHome.flagvalue = 0;
            migrateHome.reversevalue = 1;
            migrateHome.hell=true;
          };
          var error = function (err) {
            console.log('error  : ', err);
          };
          setTimeout(function(){
            migrationTask.migrate().then(success, error);
          },3000);
        }
      }
      var err=function(error){
        console.log("In error");
      }
      setTimeout(function(){
        migrationTask.noMigrate().then(success1,err);
      },2000);
    }
  }]);
