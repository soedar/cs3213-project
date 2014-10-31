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
            {'command':'Move', 'template':'views/move-command-template.html', 'commandType':'Up'},
            {'command':'Move', 'template':'views/move-command-template.html', 'commandType':'Down'},
            {'command':'Move', 'template':'views/move-command-template.html', 'commandType':'Left'},
            {'command':'Move', 'template':'views/move-command-template.html', 'commandType':'Right'},
            {'command':'Move', 'template':'views/move-command-template.html', 'commandType':'Direction'}
        ];

        $scope.loopCommands = [
            {'command':'While', 'template':'views/loop-command-template.html', 'commandType':'Loop', 'parameters':1},
            {'command':'End While', 'template':'views/loop-command-template.html', 'commandType':'Loop'}
            // {'command':'For', 'commandType':'Loop', 'parameters':1},
            // {'command':'Do While','commandType':'Loop', 'parameters':1}
        ];

       $scope.controlCommands = [
            {'command':'If', 'template':'views/control-command-template.html', 'gameObject': 'coin', 'filler' : 'in', 'variable':'Direction'},
            {'command':'End If', 'template':'views/control-command-template.html'}
        ];

        $scope.gameObjects = [
            {name:'coin', effect:'positive'},
            {name:'spinach', effect:'positive'}
        ];
        $scope.selectedObject = $scope.gameObjects[0];
        $scope.$watch('selectedObject', function(value) {
            //console.log(value);
            //console.log($scope.selectedObject);
            $scope.controlCommands[0].dataObject = $scope.selectedObject;
            console.log($scope.controlCommands[0]);
        });



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
                    if($scope.commandsWorkspace[i].command === 'End While'  ){
                        stackCommandIds.pop();
                    }
                     if($scope.commandsWorkspace[i].command === 'If') {
                        stackCommandIds.push($scope.commandsWorkspace[i].commandId);
                     }
                     if($scope.commandsWorkspace[i].command === 'End If') {
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
                if($scope.commandsWorkspace[i].command === 'While' || $scope.commandsWorkspace[i].command === 'If'){
                    nestLevel+=1;
                    commandId+=1;
                    $scope.commandsWorkspace[i].commandId = commandId;
                }
                if($scope.commandsWorkspace[i].command === 'End While' || $scope.commandsWorkspace[i].command === 'End If'){
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
