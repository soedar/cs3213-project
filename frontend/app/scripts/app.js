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
    'facebook',
    'lbServices'
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
      .state('map-maker', {
        url: '/map-maker/',
        templateUrl: 'views/map-maker.html'
      })
      .state('level', {
        url: '/level/:id',
        templateUrl: 'views/level.html',
        controller: 'LevelCtrl'
      });
  });
