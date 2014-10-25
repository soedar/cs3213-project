'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:WorkspaceCtrl
 * @description
 * # WorkspaceCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('WorkspaceCtrl', function ($scope, $state, $http, visualStore, gameEngine) {
        $scope.navigation = [
            {'command':'Move', 'commandType':'Up'},
            {'command':'Move', 'commandType':'Down'},
            {'command':'Move', 'commandType':'Left'},
            {'command':'Move', 'commandType':'Right'}
        ];

        $scope.loopCommands = [
            {'command':'While', 'commandType':'Loop', 'parameters':1},
            {'command':'End While', 'commandType':'Loop'}
            // {'command':'For', 'commandType':'Loop', 'parameters':1},
            // {'command':'Do While','commandType':'Loop', 'parameters':1}
        ];

        $scope.playerColors = ['blue', 'red', 'yellow', 'green'];

        $scope.ninjaColor = "blue";
        $scope.$watch('ninjaColor', function(value) {

        });


        $scope.commandsWorkspace = [];

        function checkInput(value) {
            if(/^[0-9]+$/.test(value)){
                return true;
            }
            else{
                return false;
            }
        }
        function getCommands() {
            var stackCommandIds = [];
            for(var i=0; i<$scope.commandsWorkspace.length; i++) {
                if($scope.commandsWorkspace[i].commandId) {
                    if($scope.commandsWorkspace[i].command === 'While'){
                        // input validation
                        if(checkInput($scope.commandsWorkspace[i].parameters) === false){
                            alert('only numbers');
                           return null;
                        }
                        stackCommandIds.push($scope.commandsWorkspace[i].commandId);
                        
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
            // For now, assume that the map is default
            var commands = getCommands();
            var map = gameEngine.defaultMap($scope.ninjaColor);

            var data = {commands: commands, map: map};
            $http.post('api/Commands', data)
              .success(function(data) {
                $state.go('visualizer', {id: data.id});
              }).error(function(data) {
                alert('Error saving to server');
              });
        };

        $scope.run = function() {
            var commands = getCommands();
            var map = gameEngine.defaultMap($scope.ninjaColor);
            var gameEvents = gameEngine.run(commands, map);

            var key = visualStore.addLocal(gameEvents);
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

        $scope.showField = function(item) {
            if(typeof item.parameters === 'undefined'){
                return false;
            }
            else{
                return true;
            }
        }
  });
