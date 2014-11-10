'use strict';

/**
 * @ngdoc service
 * @name frontendApp.levelViewer
 * @description
 * # levelViewer
 * Factory in the frontendApp.
 */
angular.module('frontendApp')
  .factory('levelViewer', function(gameEngine) {

    var games = [];
    function setMaps(maps) {
      maps.forEach(function(map, index) {
        var game = gameEngine.run([], map);
        games[index] = new Game(map, 350);
      });
    }

    function loadStage(gameIndex, stage) {
      games[gameIndex].getLayers().forEach(function(layer) {
        stage.add(layer);
      });
    }

    function changeNinja(color) {
      games.forEach(function(game) {
        game.player.changeColor(color);
      });
    }

    function run(commands, callback) {
      if (!callback) {
        callback = function() {};
      }
      games.forEach(function(game) {
        var events = gameEngine.run(commands, game.map);
        game.loadEvents(events.events);
      });

      games.forEach(function(game) {
        game.executeEvents(callback);
      });
    }

    function gotoFrame(gameIndex, newFrame) {
      var game = games[gameIndex];
      game.gotoFrame(newFrame);
    }

    function getEvents() {
      return games.map(function(game) {
        return game.events;
      });
    }

    // Public API here
    return {
      setMaps: setMaps,
      loadStage: loadStage,
      run: run,
      getEvents: getEvents,
      gotoFrame: gotoFrame,
      changeNinja: changeNinja
    };
  });
