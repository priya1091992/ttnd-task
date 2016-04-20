'use strict';

angular.module('firstSecondApp')
  .controller('MainCtrl', ['$http','migrationTask', function ($http, migrationTask) {
    var migrateHome=this;
    migrateHome.flagvalue=0;
    migrateHome.reversevalue=0;
    migrateHome.hell=false;

    migrateHome.migration=function() {
      migrateHome.flagvalue = 1;
      migrateHome.time;
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
  }]);
