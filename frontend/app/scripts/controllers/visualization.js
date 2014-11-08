'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:VisualizationCtrl
 * @description
 * # VisualizationCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('VisualizationCtrl', function ($scope, $stateParams, $timeout, visualStore, gameEngine, levelViewer) {
     var map1 = new Map(4);
     map1.addPlayer('localPlayer', 'blue', 100, {x: 0, y: 2});
     map1.addCoin({x: 1, y: 2});
     map1.addCoin({x: 2, y: 2});
     map1.addSpinach({x: 1, y: 0});
	 map1.addWall({x: 0, y: 0});
	 map1.addWall({x: 0, y: 1});
	 map1.addWall({x: 2, y: 0});
	 map1.addWall({x: 3, y: 0});
	 map1.addWall({x: 2, y: 1});
	 map1.addWall({x: 3, y: 1});
	 map1.addWall({x: 0, y: 3});
	 map1.addWall({x: 1, y: 3});
	 map1.addWall({x: 2, y: 3});
	 map1.addWall({x: 3, y: 3});

     var map2 = new Map(4);
     map2.addPlayer('localPlayer', 'blue', 100, {x: 0, y: 1});
     map2.addCoin({x: 1, y: 1});
	 map2.addWall({x: 0, y: 0});
	 map2.addWall({x: 1, y: 0});
	 map2.addWall({x: 2, y: 0});
	 map2.addWall({x: 3, y: 0});
	 map2.addWall({x: 1, y: 2});
	 map2.addWall({x: 2, y: 2});
	 map2.addWall({x: 1, y: 3});
	 map2.addWall({x: 2, y: 3});

    var maps = [map1, map2];
    levelViewer.setMaps(maps);

    var stageLeft = new Kinetic.Stage({
      container: 'stage-left',
        width: 350,
        height: 350
    });

    var stageRight = new Kinetic.Stage({
      container: 'stage-right',
        width: 350,
        height: 350
    });

    var stages = [stageLeft, stageRight];

    Assets.load(function() {
      stages.forEach(function(stage, i) {
        levelViewer.loadStage(i, stage);
      });
    });
  });
