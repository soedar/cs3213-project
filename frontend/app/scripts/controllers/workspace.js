'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:WorkspaceCtrl
 * @description
 * # WorkspaceCtrl
 * Controller of the frontendApp
 */
 var windowObject = null;

angular.module('frontendApp')
  .controller('WorkspaceCtrl', function ($scope, $state, $http, visualStore, gameEngine, levelViewer, $modal) {
        $scope.navCommands = [
            {'type' : 'navigation','command':'Move', 'template':'views/move-command-template.html', 'commandType':'Up'},
            {'type' : 'navigation','command':'Move', 'template':'views/move-command-template.html', 'commandType':'Down'},
            {'type' : 'navigation','command':'Move', 'template':'views/move-command-template.html', 'commandType':'Left'},
            {'type' : 'navigation','command':'Move', 'template':'views/move-command-template.html', 'commandType':'Right'}
           // {'type' : 'navigation','command':'Move', 'template':'views/move-command-template.html', 'commandType':'Direction'}
        ];

        $scope.gameObjects = [
            {name:'coin', effect:'positive'},
            {name:'spinach', effect:'positive'}
        ];

        $scope.operators = [
            {name: '=='},
            {name: '>='},
            {name: '<='},
            {name: '>'},
            {name: '<'}
        ];

        $scope.loopCommands = [
            {'type' : 'loop','command':'While', 'template':'views/loop-command-template.html', 'commandType':'Loop', 'parameters':1},
            {'type' : 'loop','command':'End While', 'template':'views/loop-command-template.html', 'commandType':'Loop'},
            {'type' : 'loop','command':'While', 'template':'views/loop-command-template.html', 'gameObject': $scope.gameObjects[0], 'operator' : $scope.operators[0], 'parameters':1},
            // {'command':'For', 'commandType':'Loop', 'parameters':1},
            // {'command':'Do While','commandType':'Loop', 'parameters':1}
        ];
        $scope.controlCommands = [
            {'type' : 'control', 'command':'If', 'template':'views/control-command-template.html', 'gameObject': $scope.gameObjects[0], 'operator' : $scope.operators[0], 'parameters':1},
            {'type' : 'control','command':'End If', 'template':'views/control-command-template.html'}
        ];

        


        // $scope.controlCommands[0].gameObject = $scope.gameObjects[0];
        // $scope.controlCommands[0].operator = $scope.operators[0];

        // $scope.loopCommands[2].gameObject = $scope.gameObjects[0];
        // $scope.loopCommands[2].operator = $scope.operators[0];
        // $scope.selectedObject = $scope.operators[0];
        // $scope.$watch('selectedObject', function(value) {
        //     console.log(value);
        //    // console.log($scope.selectedObject);
        //    $scope.controlCommands[0].operator = $scope.selectedObject;
        //    //console.log($scope.controlCommands[0]);
        // });



        $scope.playerColors = ['blue', 'red', 'yellow', 'green'];
        $scope.ninjaColor = 'blue';


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

            $scope.events = levelViewer.getEvents();

            $scope.sliders = $scope.events.map(function(e) { return e.length  });

            $scope.changeFrame = function(eventid) {
              levelViewer.gotoFrame(eventid, $scope.sliders[eventid]);
            }
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
        };


        $scope.tryLogic = function(size) {
            $modal.open({
                templateUrl: 'views/visualization-template.html',
                size: size
               // controller: 'WorkspaceCtrl'
        
            });
            //windowObject = window.open(document.URL, "", "width=document.outerWidth, height=document.outerHeight");
            
        };

        // $scope.showOperators = function(item) {
        //     for(var i=0; i<$scope.operators; i++) {
        //         alert(item.operator.name);
        //         if(item.operator.name === $scope.operators[i].name) {
        //             return $scope.operators[i];
        //         }
        //     }
        //     return $scope.operators;
           
        // }
       //  $scope.historyValue = true;
       //  var forTryLogic = function() {
       //      if(history.length === 1) {
       //          $scope.historyValue = false;
       //          document.onkeydown = function(e) {
       //          e = e || window.event;
       //              switch(e.which || e.keyCode) {
       //                   case 37: // left
       //                  $scope.commandsWorkspace = [];
       //                  $scope.commandsWorkspace.push({'type' : 'navigation','command':'Move', 'template':'views/move-command-template.html', 'commandType':'Left'});
       //                  $scope.run();
       //                  break;

       //                  case 38: // up
       //                  $scope.commandsWorkspace = [];
       //                  $scope.commandsWorkspace.push({'type' : 'navigation','command':'Move', 'template':'views/move-command-template.html', 'commandType':'Up'});
       //                  $scope.run();
       //                  break;

       //                  case 39: // right
                        
       //                  $scope.commandsWorkspace = [];
       //                  $scope.commandsWorkspace.push({'type' : 'navigation','command':'Move', 'template':'views/move-command-template.html', 'commandType':'Right'});
       //                  $scope.run();
       //                 // alert($scope.commandsWorkspace.length);
       //                  break;

       //                  case 40: // down
       //                  $scope.commandsWorkspace = [];
       //                  $scope.commandsWorkspace.push({'type' : 'navigation','command':'Move', 'template':'views/move-command-template.html', 'commandType':'Down'});
       //                  $scope.run();
       //                  break;

       //                  default: return; 
       //              }
       //              e.preventDefault();
       //          }
       //      }
       // }
       // forTryLogic();

  });


//     .directive('ngEnter', function () {
//     return function (scope, element, attrs) {
//         element.bind("keydown keypress", function (event) {
//             if(event.which === 38) {
//                 scope.$apply(function (){
//                     scope.$eval(attrs.ngEnter);
//                 });

//                 event.preventDefault();
//             }
//         });
//     };
// });
