'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:TabsCtrl
 * @description
 * # TabsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('TabsCtrl', function ($scope, $rootScope, $state) {
    $scope.tabs = [
        { heading: "Workspace", route:"main", active:false },
        { heading: "Visualizer", route:"visualizer", active:false }
    ];

    $rootScope.go = function(route){
        $state.go(route);
    };

    $scope.active = function(route){
        return $state.is(route);
    };


    $scope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        //console.log("start change state", toState, fromState);
        //console.log(toParams, fromParams);
    });

    $scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        //console.log("change state success", toState, fromState);
        //console.log(toParams, fromParams);
        //console.log('---');
        $scope.tabs.forEach(function(tab) {
            tab.active = $scope.active(tab.route);
        });
    });

    $scope.$on("$stateNotFound", function() {
      console.log("state not found");
    });

    $scope.$on("$stateChangeError", function() {
      console.log("state change error");
    });
  });
