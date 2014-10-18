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

    function addLocal(state) {
      var key = 'local_' + lil.uuid();
      visualStates[key] = _.clone(state);
      return key;
    }


    function load(key, callback) {
      if (callback) {
        if (visualStates[key]) {
          callback(null, visualStates[key]);
        }
      }
    }

    // Public API here
    return {
      addLocal: addLocal,
      load: load
    };
  });
