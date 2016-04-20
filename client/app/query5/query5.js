'use strict';

angular.module('firstSecondApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.query5', {
        url: '/query5',
        templateUrl: 'app/query5/query5.html',
        controller: 'Query5Ctrl',
        controllerAs:'q5'
      });
  });
