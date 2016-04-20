'use strict';

angular.module('firstSecondApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.query3', {
        url: '/query3',
        templateUrl: 'app/query3/query3.html',
        controller: 'Query3Ctrl',
        controllerAs:'q3'
      });
  });
