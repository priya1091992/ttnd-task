'use strict';

angular.module('firstSecondApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.query4', {
        url: '/query4',
        templateUrl: 'app/query4/query4.html',
        controller: 'Query4Ctrl',
        controllerAs:'q4'
      });
  });
