'use strict';

angular.module('firstSecondApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.query2', {
        url: '/query2',
        templateUrl: 'app/query2/query2.html',
        controller: 'Query2Ctrl',
        controllerAs:'q2'
      });
  });
