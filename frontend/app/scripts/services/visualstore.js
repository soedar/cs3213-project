'use strict';

/**
 * @ngdoc service
 * @name frontendApp.visualStore
 * @description
 * # visualStore
 * Factory in the frontendApp.
 */
angular.module('frontendApp')
  .factory('visualStore', function () {
    var visualStates = {};

    function addLocal(gameEvents) {
      var key = 'local_' + lil.uuid();
      console.log(gameEvents);
      visualStates[key] = gameEvents;
      return key;
    }


    function load(key, callback) {
      if (callback) {
        if (visualStates[key]) {
          callback(null, visualStates[key]);
        } else {
          callback('no_such_id');
        }
      }
    }

    // Public API here
    return {
      addLocal: addLocal,
      load: load
    };
  });
