'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
  .module('frontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'ngDragDrop'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
      .state('main', {
          url: '/',
          templateUrl: 'views/workspace.html',
          controller: 'WorkspaceCtrl'
      })
      .state('visualizer', {
          url: '^/visualizer/:id',
          templateUrl: 'views/visualizer.html'
      });
  });
