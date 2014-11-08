'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:VisualizationCtrl
 * @description
 * # VisualizationCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('VisualizationCtrl', function ($scope, $stateParams, $timeout, visualStore, gameEngine) {
     var map1 = new Map(4);
     map1.addPlayer('localPlayer', 'blue', 100, {x: 0, y: 2});
     map1.addCoin({x: 1, y: 2});
     map1.addCoin({x: 2, y: 2});
     map1.addSpinach({x: 1, y: 0});

     var map2 = new Map(4);
     map2.addPlayer('localPlayer', 'blue', 100, {x: 0, y: 0});
     map2.addCoin({x: 1, y: 2});
     map2.addCoin({x: 2, y: 2});
     map2.addSpinach({x: 1, y: 0});


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

    Assets.load(function() {
      var gameLeft = new Game(map1, 350);
      gameLeft.getLayers().forEach(function(layer) {
        stageLeft.add(layer);
      });

      var gameRight = new Game(map2, 350);
      gameRight.getLayers().forEach(function(layer) {
        stageRight.add(layer);
      });
    });
  });
