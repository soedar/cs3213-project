var app = angular.module('index', ['ui.bootstrap', 'ui.router']);

app.controller('TabsController', function ($scope, $state) {
    $scope.tabs = [
      { heading: 'Workspace', route:'workspace', active:false },
      { heading: 'Game Room', route:'gameroom', active:false }
    ];

    $scope.go = function(route) {
          $state.go(route);
    };

    $scope.active = function(route) {
        return $state.is(route);
    };

    $scope.$on('$stateChangeSuccess', function() {
      $scope.tabs.forEach(function(tab) {
          tab.active = $scope.active(tab.route);
      });
    });
});

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', { abstract: true, url:'/', templateUrl:'views/workspace.html' })
    .state('workspace', { templateUrl: 'views/workspace.html' })
    .state('gameroom', { templateUrl: 'views/gameroom.html' })
});