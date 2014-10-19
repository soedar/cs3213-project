'use strict';
var _ = require('lodash');

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
  
  DEBUG(objectsMemory);
  if(this.playerActions) {
	  gameOutput.events = this.makeEvents(this.playerActions, player, objectsMemory);
  }
  return gameOutput;
};

Engine.prototype.makeEvents = function(actions, player, objectsMemory) {
	var i;
	var events = [];
	for (i = 0; i < actions.length; i++) {
		if (actions[i].commandType === 'Loop') {
			if (actions[i].command === 'While') {
				var whileActions = this.getWhileActionList(actions, i);
				var j;
				var whileActionsFull = [];
				for (j = 0; j < actions[i].parameters; j++) {
					Array.prototype.push.apply(whileActionsFull, whileActions);
				}
				Array.prototype.push.apply(events, this.makeEvents(whileActionsFull, player, objectsMemory));
				i += whileActions.length + 1;
			}
		} else {
			var e = this.makeEvent(actions[i], player, objectsMemory);
		    if (e) {
		      events.push(e);
		    }
		}
	}
	return events
};


Engine.prototype.getWhileActionList = function(actions, startingPoint) {
	var whileActions = [];
	if (actions[startingPoint].command === 'While') {
		var i;
		for (i = startingPoint + 1; i < actions.length; i++) {
			if (actions[i].command === 'End While') {
				break;
			}
			whileActions.push(actions[i]);
		}
		return whileActions;
	}
}

Engine.prototype.makeEvent = function(action, player, objectsMemory) {
  if (action.command === 'Move') {
    var new_xy = _.clone(player.xy);
    switch(action.commandType) {
      case 'Left':
        new_xy.x -= action.parameters;
        break;
      case 'Right':
        new_xy.x += action.parameters;
        break;
      case 'Up':
        new_xy.y -= action.parameters;
        break;
      case 'Down':
        new_xy.y += action.parameters;
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
    //If there is, get and delete the object
	var obj;
	var i;
	for (i = 0; i < objectsMemory.length; i++) {
		var object = objectsMemory[i];
		if (new_xy.x === object.xy.x && new_xy.y === object.xy.y) {
			obj = object;
			objectsMemory.splice(i, 1);
			break;
		}
	}

    var e = {
      id: player.id,
      update: {}
    };

    // Player will definitely reduce health at every turn
    e.update[player.id] = {health: player.model.health};

    // There is an object at the same location as the new location
    if (obj) {
      // Assume that only one object can be at a position
      if (obj.type === "coin") {
        player.xy = new_xy;
        player.model.coin++;

        e.type = 'pickCoin';
        e.target = obj.id;
        e.update[player.id].coin = player.model.coin;
      }
      else if (obj.type === "spinach") {
        player.xy = new_xy;
        player.model.health += 5;

        e.type = 'pickSpinach';
        e.target = obj.id;
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

module.exports = Engine;
