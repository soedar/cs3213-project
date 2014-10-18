'use strict';

/**
 * @ngdoc service
 * @name frontendApp.visualStore
 * @description
 * # visualStore
 * Factory in the frontendApp.
 */
angular.module('frontendApp')
  .factory('visualStore', function ($http) {
    var visualStates = {};

    function addLocal(gameEvents) {
      var key = 'local_' + lil.uuid();
      visualStates[key] = gameEvents;
      return key;
    }


    function load(key, callback) {
      if (callback) {
        if (visualStates[key]) {
          callback(null, visualStates[key]);
          return;
        }
        else {
          var url = 'api/Commands/visualization';
          $http.get(url, {params: {id: key}})
            .success(function(data) {
              callback(null, data);
            })
            .error(function(data) {
              callback('error');
            });
        }
      }
    }

    // Public API here
    return {
      addLocal: addLocal,
      load: load
    };
  });
