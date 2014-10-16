'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:TabsCtrl
 * @description
 * # TabsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('TabsCtrl', function ($scope, $state) {
    $scope.tabs = [
        { heading: "Workspace", route:"main", active:false },
        { heading: "Visualizer", route:"visualizer", active:false }
    ];
 
    $scope.go = function(route){
        $state.go(route);
    };
 
    $scope.active = function(route){
        return $state.is(route);
    };
 
    $scope.$on("$stateChangeSuccess", function() {
        $scope.tabs.forEach(function(tab) {
            tab.active = $scope.active(tab.route);
        });
    });
  });
