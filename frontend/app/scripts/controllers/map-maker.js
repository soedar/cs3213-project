'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MapMakerCtrl
 * @description
 * # MapMakerCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MapMakerCtrl', function ($scope, $state, $http, visualStore, gameEngine, levelViewer) {
        var mapSize = 4;

        $scope.leftGrid = [];

        $scope.rightGrid = [];

        for (var xCoord = 0; xCoord < mapSize; xCoord++){
            for (var yCoord = 0; yCoord < mapSize; yCoord++){
                $scope.leftGrid.push({x: xCoord, y: yCoord});
                $scope.rightGrid.push({x: xCoord, y: yCoord});
            }
        }

        $scope.objectList=[
            {type: "coin"},
            //{type: "grass"},
            //Grass is not used, and it is .jpg instead of .png
            {type: "spinach"},
            {type: "wall"}
        ];

        $scope.leftMap = [];
        $scope.rightMap = [];
        
        $scope.dropped = function(){
            console.log(JSON.stringify($scope.leftGrid));
        };

        // $scope.selectedObject = $scope.operators[0];
        // $scope.$watch('selectedObject', function(value) {
        //     console.log(value);
        //    // console.log($scope.selectedObject);
        //    $scope.controlCommands[0].operator = $scope.selectedObject;
        //    //console.log($scope.controlCommands[0]);
        // });


        $scope.playerColors = ['blue', 'red', 'yellow', 'green'];
        $scope.ninjaColor = 'blue';

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
            console.log(commands);
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

            levelViewer.run(commands);
            //var map = gameEngine.defaultMap($scope.ninjaColor);
            //var gameEvents = gameEngine.run(commands, map);

            //var key = visualStore.addLocal(gameEvents);
            //$state.go('visualizer', {id: key});
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
            console.log($scope.leftGrid);
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
        };
  });
