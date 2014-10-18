'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:WorkspaceCtrl
 * @description
 * # WorkspaceCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('WorkspaceCtrl', function ($scope, $state, visualStore) {
        $scope.navigation = [
            {'command':'Move', 'commandType':'Up','parameters':1},
            {'command':'Move', 'commandType':'Down','parameters':1},
            {'command':'Move', 'commandType':'Left','parameters':1},
            {'command':'Move', 'commandType':'Right','parameters':1}
        ];

        $scope.loopCommands = [
            {'command':'While', 'commandType':'Loop', 'parameters':1},
            {'command':'End While', 'commandType':'Loop'}
            // {'command':'For', 'commandType':'Loop', 'parameters':1},
            // {'command':'Do While','commandType':'Loop', 'parameters':1}
        ];

        $scope.commandsWorkspace = [];

        function getCommands() {
            var stackCommandIds = [];
            for(var i=0; i<$scope.commandsWorkspace.length; i++) {
                if($scope.commandsWorkspace[i].commandId) {
                    if($scope.commandsWorkspace[i].command === 'While'){
                        stackCommandIds.push($scope.commandsWorkspace[i].commandId)
                    }
                    if($scope.commandsWorkspace[i].command === 'End While'){
                        stackCommandIds.pop();
                    }
                }
            }

            if (stackCommandIds.length === 0) {
                return $scope.commandsWorkspace;
            } else {
                // Error in command order
                return null;
            }
        }

		    $scope.sendData = function(){
            console.log(JSON.stringify(getCommands()));
        };

        $scope.run = function() {
            var commands = getCommands();

            var map = new Map(4);
            map.addPlayer("testPlayer", "blue", 100, {x: 0, y: 2});
            map.addCoin({x: 1, y: 2});
            map.addCoin({x: 2, y: 2});
        	  map.addSpinach({x: 1, y: 0});
            var engine = new Engine(map, commands);
            var gameEvents = engine.run();

            var key = visualStore.addLocal(commands, gameEvents);
            $state.go('visualizer', {id: key});
        };

        $scope.removeCommands = function(index) {
            if($scope.commandsWorkspace[index].commandId){
                var startCommandId = $scope.commandsWorkspace[index].commandId;
                for(var i=index+1; i<$scope.commandsWorkspace.length; i++){
                    if($scope.commandsWorkspace[i].commandId){
                        var endCommandId = $scope.commandsWorkspace[i].commandId;
                        if(startCommandId === endCommandId){
                            $scope.commandsWorkspace.splice(index, i - index + 1);
                            return;
                        }
                    }
                }
            }
            $scope.commandsWorkspace.splice(index, 1);
        };

        $scope.clearCommands = function() {
            $scope.commandsWorkspace = [];
        };

        $scope.setNestLevel = function() {
            var nestLevel = 0;
            var commandId = 0;
            for(var i=0; i<$scope.commandsWorkspace.length; i++){
                $scope.commandsWorkspace[i].nestLevel = nestLevel;
                if($scope.commandsWorkspace[i].command === 'While'){
                    nestLevel+=1;
                    commandId+=1;
                    $scope.commandsWorkspace[i].commandId = commandId;
                }
                if($scope.commandsWorkspace[i].command === 'End While'){
                    nestLevel-=1;
                    $scope.commandsWorkspace[i].nestLevel = nestLevel;
                    $scope.commandsWorkspace[i].commandId = commandId;
                    commandId-=1;
                }
                console.log($scope.commandsWorkspace[i]);
            }
        };
  });
