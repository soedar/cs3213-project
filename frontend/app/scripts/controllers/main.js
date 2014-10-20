'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp', ['facebook', 'ui.bootstrap', 'ui.router'])
  .config([
    'FacebookProvider', '$stateProvider', '$urlRouterProvider',
    function(FacebookProvider, $stateProvider, $urlRouterProvider) {
      var myAppId = '1567060866849242';
      FacebookProvider.init(myAppId);

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('main', { abstract: true, url:'/', templateUrl:'views/workspace.html' })
        .state('workspace', { templateUrl: 'views/workspace.html' })
        .state('gameroom', { templateUrl: 'views/gameroom.html' })
    }
  ])
  .controller('MainCtrl', ['$scope', '$state', '$timeout','Facebook',
    function($scope, $state, $timeout, Facebook) {

      //============= FACEBOOK ============//
      $scope.user = {};
      $scope.logged = false;

      $scope.byebye = false;
      $scope.greeting = false;

      $scope.$watch(
        function() {
          return Facebook.isReady();
        },
        function(newVal) {
          if (newVal)
            $scope.facebookReady = true;
        }
      );

      var userIsConnected = false;

      Facebook.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          userIsConnected = true;
          $scope.logged = true;
          $scope.login();
        }
      });

      $scope.IntentLogin = function() {
        if(!userIsConnected) {
          $scope.login();
        }
      };

     $scope.login = function() {
       Facebook.login(function(response) {
        if (response.status == 'connected') {
          $scope.logged = true;
          $scope.me();
        }
      });
     };

      $scope.me = function() {
        Facebook.api('/me', function(response) {
          $scope.$apply(function() {
            $scope.user = response;
          });
        });
      };

      $scope.logout = function() {
        Facebook.logout(function() {
          $scope.$apply(function() {
            $scope.user   = {};
            $scope.logged = false;
          });
        });
      };

      $scope.$on('Facebook:statusChange', function(ev, data) {
        if (data.status == 'connected') {
          $scope.$apply(function() {
            $scope.greeting = true;
            $scope.byebye     = false;
          });
        } else {
          $scope.$apply(function() {
            $scope.greeting = false;
            $scope.byebye     = true;

            $timeout(function() {
              $scope.byebye = false;
            }, 2000)
          });
        }
      });


      //============= TABS ============//
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
    }
]);