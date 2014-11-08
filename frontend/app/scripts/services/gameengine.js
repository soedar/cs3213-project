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

    function run(commands, map) {
      var engine = new Engine(map, commands);

      return engine.run();
    }

    // Public API here
    return {
      run: run
    };
  });
