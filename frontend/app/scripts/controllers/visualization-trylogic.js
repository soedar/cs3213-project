'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:VisualizationCtrl
 * @description
 * # VisualizationCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('VisualizationTryLogicCtrl', function ($scope, $stateParams, $timeout, visualStore, gameEngine, levelViewerTryLogic) {
     var map1 = new Map(4);
     map1.addPlayer('localPlayer', 'blue', 100, {x: 0, y: 2});
     map1.addCoin({x: 1, y: 2});
     map1.addCoin({x: 2, y: 2});
     map1.addSpinach({x: 1, y: 0});

     var map2 = new Map(4);
     map2.addPlayer('localPlayer', 'blue', 100, {x: 0, y: 1});
     map2.addCoin({x: 1, y: 1});

    var maps = [map1, map2];
    levelViewerTryLogic.setMaps(maps);

    var stageLeft = new Kinetic.Stage({
      container: 'stage-left1',
        width: 350,
        height: 350
    });

    var stageRight = new Kinetic.Stage({
      container: 'stage-right1',
        width: 350,
        height: 350
    });



    var stages = [stageLeft, stageRight];

    Assets.load(function() {
      stages.forEach(function(stage, i) {
        levelViewerTryLogic.loadStage(i, stage);
      });
      var executing = false;
      document.onkeydown = function(e) {
        e = e || window.event;
        var cmd = [{'type' : 'navigation','command':'Move', 'template':'views/move-command-template.html'}];
        switch(e.which || e.keyCode) {
            case 37: // left
              cmd[0].commandType = 'Left';
              break;
            case 38: // up
              cmd[0].commandType = 'Up';
              break;
            case 39: // right
              cmd[0].commandType = 'Right';
              break;
            case 40: // down
              cmd[0].commandType = 'Down';
              break;
            default: 
              return; 
        }
        e.preventDefault();
        levelViewerTryLogic.run(cmd);
      }
    });
  });
