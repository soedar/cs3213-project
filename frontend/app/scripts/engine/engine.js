'use strict';
/*global _:false */

function Engine(map, playerActions) {
  this.map = map;
  this.playerActions = playerActions;
}

Engine.prototype.run = function() {
  var objectsMemory = _.cloneDeep(this.map.objects);

  var gameOutput = {};
  gameOutput.mapSize = this.map.mapSize;
  gameOutput.objects = _.cloneDeep(this.map.objects);
  gameOutput.events = [];


  var players = objectsMemory.filter(function(object) {
    return object.type === 'player';
  });

  // Assume we only have one player for now
  var player = players[0];
  this.playerActions.forEach(function(action) {
    var e = this.makeEvent(action, player, objectsMemory);
    if (e) {
      gameOutput.events.push(e);
    }
  }.bind(this));

  return gameOutput;
};

Engine.prototype.makeEvent = function(action, player, objectsMemory) {
  if (action.command === 'Move') {
    var new_xy = _.clone(player.xy);
    switch(action.direction) {
      case 'Left':
        new_xy.x -= action.steps;
        break;
      case 'Right':
        new_xy.x += action.steps;
        break;
      case 'Up':
        new_xy.y -= action.steps;
        break;
      case 'Down':
        new_xy.y += action.steps;
        break;
    }

    // Ignore moves that goes out of the boundary
    if (new_xy.x < 0 || new_xy.y < 0 ||
        new_xy.x >= this.map.mapSize || new_xy.y >= this.map.mapSize) {
          return null;
        }

    // We have determine a valid move, so we reduce the health
    player.model.health -= 1;

    // See if there are any objects that has the coordinate
    var obj = objectsMemory.filter(function(object) {
      return new_xy.x === object.xy.x && new_xy.y === object.xy.y;
    });

    var e = {
      id: player.id,
      update: {}
    };

    // Player will definitely reduce health at every turn
    e.update[player.id] = {health: player.model.health};

    // There is an object at the same location as the new location
    if (obj.length > 0) {
      // Assume that only one object can be at a position
      if (obj[0].type === "coin") {
        player.xy = new_xy;
        player.model.coin++;

        e.type = 'pickCoin';
        e.target = obj[0].id;
        e.update[player.id].coin = player.model.coin;
      }
      else if (obj[0].type === "spinach") {
        player.xy = new_xy;
        player.model.health += 5;

        e.type = 'pickSpinach';
        e.target = obj[0].id;
        e.update[player.id].health = player.model.health;
      }
    }

    // Nothing there, so we can move to the new location
    else {
      player.xy = new_xy;
      e.type = 'move';
    }


    // Update the location of the player
    e.xy = _.clone(player.xy);
    return e;
  }
};
