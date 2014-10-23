'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:VisualizationCtrl
 * @description
 * # VisualizationCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('VisualizationCtrl', function ($scope, $stateParams, $attrs, $timeout, visualStore, gameEngine) {

    var size = (!$attrs.visualsize) ? 500 : $attrs.visualsize;

    var stage = new Kinetic.Stage({
      container: 'container',
        width: size,
        height: size
    });

    function loadBoard(gameData) {
      var game = new Game(gameData.events, size);
      game.getLayers().forEach(function(layer) {
        stage.add(layer);
      });

      var player;
      // We assume that there is only one player for now
      for (var id in game.objects) {
        var object = game.objects[id];
        if (object instanceof Player) {
          player = object;
          break;
        }
      }

      $timeout(function() {
        $scope.hasMoves = (game.events.length > 0);
        $scope.game = game;
        $scope.player = player;
        $scope.gameData = gameData;
      });
    }


    Assets.load(function() {
      if ($stateParams.id) {
        visualStore.load($stateParams.id, function(error, gameData) {
          if (error) {
            $timeout(function() {
              $scope.error = 'No such game id';
            });
            return;
          }
          loadBoard(gameData);
        });
      } else {
        loadBoard(gameEngine.run([]));
      }
    });

    function updateScope(done) {
      if (!done) {
        $timeout(function() {});
      } else {
        $timeout(function() {
          $scope.hasMoves = false;
        });
      }
    }

    $scope.execute = function() {
      $scope.game.executeEvents(updateScope);
    };

    $scope.executeNextEvent = function() {
      $scope.game.executeNextEvent(updateScope);
    };
  });
