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
    'ngDragDrop',
    'facebook'
  ])
  .config(function (FacebookProvider, $stateProvider, $urlRouterProvider) {
      var myAppId = '1567060866849242';
      FacebookProvider.init(myAppId);

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
      })
      .state('map-maker', {
        url: '/map-maker/',
        templateUrl: 'views/map-maker.html'
      });
  });
