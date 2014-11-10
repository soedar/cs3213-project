'use strict';
/*global _:false */

function Engine(map, playerActions) {
  this.map = map;
  this.playerActions = playerActions;
}

//main methods

Engine.prototype.run = function() {
  console.log('START ENGINE'); 
  var gameOutput = {};
  gameOutput.mapSize = this.map.mapSize;
  gameOutput.objects = _.cloneDeep(this.map.objects);
  gameOutput.events = [];
  
  if(this.playerActions) {
	  gameOutput.events = this.makeEvents(this.playerActions);
  }
  return gameOutput;
};

Engine.prototype.makeEvents = function(actions) {
	var i;
	var events = [];
	for (i = 0; i < actions.length; i++) {
		if (actions[i].command === 'While') {
				var whileActions = this.getWhileActionList(actions, i);
				var j;
				var whileActionsFull = [];
				//Old while version which has manual parameter
				if (!actions[i].operator) {
					for (j = 0; j < actions[i].parameters; j++) {
						Array.prototype.push.apply(whileActionsFull, whileActions);
						Array.prototype.push.apply(events, this.makeEvents(whileActionsFull));
					}
				} else { //New WHILE version which has conditions
					var count = 0;
					while (this.isConditionSatisfied(actions[i].gameObject, actions[i].operator, actions[i].parameters) && count < 100) {
						Array.prototype.push.apply(events, this.makeEvents(whileActions));
						count++;
					}
				}
				i += whileActions.length + 1;
		} else if (actions[i].command === 'If') {
			var ifActions = this.getIfActionList(actions, i);
			if (this.isConditionSatisfied(actions[i].gameObject, actions[i].operator, actions[i].parameters)) {
				Array.prototype.push.apply(events, this.makeEvents(ifActions));
			}
			i += ifActions.length + 1;
		} else {
			var e = this.makeEvent(actions[i]);
		    if (e) { events.push(e); }
		}
	}
	return events;
};

Engine.prototype.makeEvent = function(action) {
  if (action.command === 'Move') {
	var player = this.getPlayer();
	var direction = action.commandType;
	
	if (!this.isValidMove(direction)) {
		return null;
	}
	
	this.updatePlayerPosition(direction);
	var obj = this.popObjectAtPosition(player.xy); //get and delete an object at a specific location
    player.model.health -= 1;
	
    var e = {
      id: player.id,
	  xy: _.clone(player.xy),
      update: {}
    };
    // Player will definitely reduce health at every turn
    e.update[player.id] = {health: player.model.health};
    // There is an object at the same location as the new location
    if (obj) {
      // Assume that only one object can be at a position
      if (obj.type === 'coin') {
        player.model.coin++;
        e.type = 'pickCoin';
        e.target = obj.id;
        e.update[player.id].coin = player.model.coin;
      }
      else if (obj.type === 'spinach') {
        player.model.health += 5;
        e.type = 'pickSpinach';
        e.target = obj.id;
        e.update[player.id].health = player.model.health;
      }
    } else {
		e.type = 'move';
    }
    return e;
  }
};

//helping methods

Engine.prototype.isConditionSatisfied = function(object, operator, parameter) {
	if (object === 'coin') {
		var player = this.getPlayer();
		switch (operator) {
			case '==':
				return player.model.coin == parameter;
			case '!=':
				return player.model.coin != parameter;
			case '>':
				return player.model.coin > parameter;
			case '>=':
				return player.model.coin >= parameter;
			case '<':
				return player.model.coin < parameter;
			case '<=':
				return player.model.coin <= parameter;
		}
	} else if (object === 'spinach') {
	
	} else if (object === 'wall') {
	
	}
};

Engine.prototype.popObjectAtPosition = function(xy) {
	var obj;
	var i;
	for (i = 0; i < this.map.objects.length; i++) {
		var object = this.map.objects[i];
		if (object.type !== 'player' && (xy.x === object.xy.x && xy.y === object.xy.y)) {
			obj = object;
			this.map.objects.splice(i, 1);
			return obj;
		}
	}
	return null;
};

Engine.prototype.getObjectAtPosition = function(xy) {
	var i;
	for (i = 0; i < this.map.objects.length; i++) {
		var object = this.map.objects[i];
		if (xy.x === object.xy.x && xy.y === object.xy.y) {
			return object;
		}
	}
	return null;
};

Engine.prototype.isValidMove = function(direction) {
	var player = this.getPlayer();
	var newXY = _.clone(player.xy);
	switch(direction) {
      case 'Left':
        newXY.x --;
		break;
      case 'Right':
		newXY.x ++;
		break;
      case 'Up':
        newXY.y --;
		break;
      case 'Down':
		newXY.y ++;
		break;
    }
	var object = this.getObjectAtPosition(newXY);
	if (newXY.x < 0 || newXY.x >= this.map.mapSize || newXY.y < 0 || newXY.y >= this.map.mapSize || (object !== null && object.type === 'wall')) {
		console.log('Return false');
		return false;
	}
	return true;
};

Engine.prototype.updatePlayerPosition = function(direction) {
	var player = this.getPlayer();
	switch(direction) {
      case 'Left':
		player.xy.x--;
		break;
      case 'Right':
        player.xy.x++;
		break;
      case 'Up':
        player.xy.y--;
		break;
      case 'Down':
        player.xy.y++;
		break;
    }
};

Engine.prototype.getPlayer = function () {
	var players = this.map.objects.filter(function(object) {
		return object.type === 'player';
	  });
	return players[0];
};

Engine.prototype.getIfActionList = function(actions, startingPoint) {
	var ifActions = [];
	if (actions[startingPoint].command === 'If') {
		var i;
		for (i = startingPoint + 1; i < actions.length; i++) {
			if (actions[i].command === 'End If' && actions[startingPoint].nestLevel === actions[i].nestLevel) {
				break;
			}
			ifActions.push(actions[i]);
		}
	}
	return ifActions;
};

Engine.prototype.getWhileActionList = function(actions, startingPoint) {
	var whileActions = [];
	if (actions[startingPoint].command === 'While') {
		var i;
		for (i = startingPoint + 1; i < actions.length; i++) {
			if (actions[i].command === 'End While' && actions[startingPoint].nestLevel === actions[i].nestLevel) {
				break;
			}
			whileActions.push(actions[i]);
		}
		return whileActions;
	}
};

Engine.prototype.getObjectsInRange = function(checkedObject, range, player) {
	var results = [];
	var checkedTargets = this.map.objects.filter(function(value) { return value.type === checkedObject;});
	checkedTargets.forEach(function(object) {
		var distance = Math.abs(player.xy.x - object.xy.x) + Math.abs(player.xy.y - object.xy.y);
		if (distance <= range) {
			results.push(object);
		}
	});
	return results;
};

Engine.prototype.getDirection = function (checkedObject, range, player) {
	var objectsInRange = this.getObjectsInRange(checkedObject, range, player);
	var object;
	if (objectsInRange.length > 0) { //if there is objects around player, get the first one
		object = objectsInRange[0];
	} else {
		return 'none';
	}
	
	if (object.xy.x < player.xy.x) { 
		return 'Left'; 
	}
	if (object.xy.x > player.xy.x) {
		return 'Right';
	}
	if (object.xy.y < player.xy.y) {
		return 'Up';
	}
	if (object.xy.y > player.xy.y) {
		return 'Down';
	}
};
