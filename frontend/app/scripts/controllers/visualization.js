'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:VisualizationCtrl
 * @description
 * # VisualizationCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('VisualizationCtrl', function ($scope, $stateParams, visualStore) {
    var stage = new Kinetic.Stage({
      container: 'container',
        width: 500,
        height: 500
    });

    function loadBoard(gameData) {
      var game = new Game(gameData.events, 500);
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

      $scope.$apply(function() {
        $scope.hasMoves = (game.events.length > 0);
        $scope.game = game;
        $scope.player = player;
        $scope.gameData = gameData;
      });
    }


    Assets.load(function() {
      if ($stateParams.id) {
        visualStore.load($stateParams.id, function(error, gameData) {
          console.log(gameData);
          if (error) {
            $scope.$apply(function() {
              $scope.error = 'No such game id';
            });
            return;
          }
          loadBoard(gameData);
        });
      } else {
      }
    });

    function updateScope(done) {
      if (!done) {
        $scope.$apply();
      } else {
        $scope.$apply(function() {
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
