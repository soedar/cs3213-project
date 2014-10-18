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
    if (!$stateParams.id) {
      return;
    }

    var stage = new Kinetic.Stage({
      container: 'container',
        width: 500,
        height: 500
    });

    Assets.load(function() {
      visualStore.load($stateParams.id, function(error, gameData) {
        var game = new Game(gameData, 500);
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
          $scope.game = game;
          $scope.player = player;
        });
      });
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

    $scope.hasMoves = true;

    $scope.execute = function() {
      $scope.game.executeEvents(updateScope);
    };

    $scope.executeNextEvent = function() {
      $scope.game.executeNextEvent(updateScope);
    };
  });
