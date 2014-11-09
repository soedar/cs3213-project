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
        //{ heading: "Visualizer", route:"visualizer", active:false },
        { heading: "Map Maker", route: "map-maker", active:false}
    ];

    $rootScope.go = function(route){
        $state.go(route);
    };

    $scope.active = function(route){
        return $state.is(route);
    };

    $scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        $scope.tabs.forEach(function(tab) {
            tab.active = $scope.active(tab.route);
        });
    });
  });
