'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:VisualizationCtrl
 * @description
 * # VisualizationCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('VisualizationCtrl', function ($scope) {
       
        var stage = new Kinetic.Stage({
            container: 'container',
            width: 500,
            height: 500
        });
        
        Assets.load(function() {
            $.get('player.json', function(playerMoves) {
                var map = new Map(4);
                map.addPlayer("testPlayer", "blue", 100, {x: 0, y: 2});
                map.addCoin({x: 1, y: 2});
                map.addCoin({x: 2, y: 2});
        		map.addSpinach({x: 1, y: 0});
                var engine = new Engine(map, playerMoves);
        
                var gameData = engine.run();
        
                var game = new Game(gameData, 500);
                game.getLayers().forEach(function(layer) {
                    stage.add(layer);
                });

                $scope.game = game;
            });
        });
  });
