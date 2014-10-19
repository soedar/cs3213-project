'use strict';

/**
 * @ngdoc service
 * @name frontendApp.gameEngine
 * @description
 * # gameEngine
 * Factory in the frontendApp.
 */
angular.module('frontendApp')
  .factory('gameEngine', function () {

    function defaultMap(color) {
      var map = new Map(4);
      map.addPlayer("localPlayer", color, 100, {x: 0, y: 2});
      map.addCoin({x: 1, y: 2});
      map.addCoin({x: 2, y: 2});
      map.addSpinach({x: 1, y: 0});
      return map;
    }

    function run(commands, map) {
      if (!map) {
        map = defaultMap();
      }
      var engine = new Engine(map, commands);
      return {commands: commands, events: engine.run()};
    }

    // Public API here
    return {
      run: run,
      defaultMap: defaultMap
    };
  });
