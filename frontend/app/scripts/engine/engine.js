'use strict';
/*global _:false */

function Engine(map, playerActions) {
  this.map = map;
  this.playerActions = playerActions;
  this.variables = [];
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
  
  if(this.playerActions) {
	  gameOutput.events = this.makeEvents(this.playerActions, player, objectsMemory);
  }
  return gameOutput;
};

Engine.prototype.makeEvents = function(actions, player, objectsMemory) {
	var i;
	var events = [];
	for (i = 0; i < actions.length; i++) {
		if (actions[i].command === 'While') {
				var whileActions = this.getWhileActionList(actions, i);
				var j;
				var whileActionsFull = [];
				for (j = 0; j < actions[i].parameters; j++) {
					Array.prototype.push.apply(whileActionsFull, whileActions);
				}
				Array.prototype.push.apply(events, this.makeEvents(whileActionsFull, player, objectsMemory));
				i += whileActions.length + 1;
		} else if (actions[i].command === 'If') {
			var ifActions = this.getIfActionList(actions, i);
			var direction = this.getDirection(actions[i].gameObject, 1, player);
			if (direction !== 'none') {
				this.variables['direction'] = direction;
				Array.prototype.push.apply(events, this.makeEvents(ifActions, player, objectsMemory));
			}
			i += ifActions.length + 1;
		} else {
			var e = this.makeEvent(actions[i], player, objectsMemory);
		    if (e) { events.push(e); }
		}
	}
	return events
};

Engine.prototype.getDirection = function (checkedObject, range, player) {
	var objectsInRange = this.getObjectsInRange(checkedObject, range, player);
	var object;
	if (objectsInRange.length > 0) { //if there is objects around player, get the first one
		object = objectsInRange[0];
	} else {
		return 'none';
	}
	
	if (object.xy.x < player.xy.x)
		return 'Left';
	if (object.xy.x > player.xy.x)
		return 'Right';
	if (object.xy.y < player.xy.y)
		return 'Up';
	if (object.xy.y > player.xy.y)
		return 'Down';
}

Engine.prototype.getObjectsInRange = function(checkedObject, range, player) {
	var results = [];
	var checkedTargets = this.map.objects.filter(function(value) { return value.type === checkedObject;});
	checkedTargets.forEach(function(object) {
		var distance = Math.abs(player.xy.x - object.xy.x) + Math.abs(player.xy.y - object.xy.y);
		if (distance <= range)
			results.push(object);
	});
	return results;
}

Engine.prototype.getIfActionList = function(actions, startingPoint) {
	var ifActions = [];
	if (actions[startingPoint].command === 'If') {
		var i;
		for (i = startingPoint + 1; i < actions.length; i++) {
			if (actions[i].command === 'End If' && actions[startingPoint].nestLevel == actions[i].nestLevel)
				break;
			ifActions.push(actions[i]);
		}
	}
	return ifActions;
}

Engine.prototype.getWhileActionList = function(actions, startingPoint) {
	var whileActions = [];
	if (actions[startingPoint].command === 'While') {
		var i;
		for (i = startingPoint + 1; i < actions.length; i++) {
			if (actions[i].command === 'End While' && actions[startingPoint].nestLevel == actions[i].nestLevel) {
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
	var direction;
	if (action.commandType === 'Direction') {
		direction = this.variables['direction'];
	} else {
		direction = action.commandType;
	}
	
    switch(direction) {
      case 'Left':
        new_xy.x --;
        break;
      case 'Right':
        new_xy.x ++;
        break;
      case 'Up':
        new_xy.y --;
        break;
      case 'Down':
        new_xy.y ++;
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
