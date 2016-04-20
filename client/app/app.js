'use strict';

angular.module('firstSecondApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'infinite-scroll'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/main');

    $locationProvider.html5Mode(true);
  });
