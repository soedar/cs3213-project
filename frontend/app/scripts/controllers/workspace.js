'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:WorkspaceCtrl
 * @description
 * # WorkspaceCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('WorkspaceCtrl', function ($scope) {
        $scope.navigation = [
            {'command':'Move', 'direction':'Up','steps':0},
            {'command':'Move', 'direction':'Down','steps':0},
            {'command':'Move', 'direction':'Left','steps':0},
            {'command':'Move', 'direction':'Right','steps':0}
        ];

        $scope.commandsWorkspace = [];

        $scope.hideMe = function() {
		    return $scope.commandsWorkspace.length > 0;
		  }

		$scope.sendData = function(){
			console.log(JSON.stringify($scope.commandsWorkspace));
		};

        $scope.removeCommands = function(index) {
          $scope.commandsWorkspace.splice(index, 1);
        };

        $scope.clearCommands = function() {
            $scope.commandsWorkspace = [];
        };
  });
