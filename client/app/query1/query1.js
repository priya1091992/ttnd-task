'use strict';

angular.module('firstSecondApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.query1', {
        url: '/query1',
        templateUrl: 'app/query1/query1.html',
        controller: 'Query1Ctrl',
        controllerAs:'q1'
      });
  });
