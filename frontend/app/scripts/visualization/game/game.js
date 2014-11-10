'use strict';
/*global Grid:false, Kinetic:false, Assets:false, Player:false, DEBUG:false*/

function Tile() {
  Grid.call(this, {}, new Kinetic.Rect({
    stroke: '#000000',
    strokeWidth: 0.3,
    fill: '#d9d7d7',
    //fillPatternImage: Assets.grass
  }));
}
Tile.prototype = Object.create(Grid.prototype);


function Game(map, canvasSize) {
  this.size = map.mapSize;
  this.canvasSize = canvasSize;
  this.gridSize = canvasSize / this.size;
  this.map = map;

  this._backgroundLayer = new Kinetic.Layer();
  this._objectLayer = new Kinetic.Layer();

  this.objects = {};

  //this.events = this.game.events;
  //this.eventCounter = 0;
  Grid.prototype.size = this.gridSize;

  this.objectStates = [];
  this.player = null;
}

Game.prototype.getLayers = function() {
  var layers = [];
  layers.push(this.getBackgroundLayer());
  layers.push(this.getObjectLayer());

  return layers;
};

Game.prototype.getBackgroundLayer = function() {
  for (var i=0;i<this.size;i++) {
    for (var j=0;j<this.size;j++) {
      var tile = new Tile();
      tile.setGrid(i, j);

      this._backgroundLayer.add(tile.repr);
    }
  }
  return this._backgroundLayer;
};

Game.prototype.getObjectLayer = function() {
  this.map.objects.forEach(function(obj) {
    var object;
    if (obj.type === 'player') {
      object = new Player(obj.model);
      this.player = object;
    } else if (obj.type === 'coin') {
      object = new Coin();
    } else if (obj.type === 'spinach') {
      object = new Spinach();
    } else if (obj.type === 'wall') {
		object = new Wall();
	}

    if (object) {
      object.setGrid(obj.xy.x, obj.xy.y);
      this.objects[obj.id] = object;
      this._objectLayer.add(object.repr);
    }
  }.bind(this));

  this.addObjectState();

  return this._objectLayer;
};

Game.prototype.addObjectState = function() {
  var state = {};
  for (var key in this.objects) {
    var object = this.objects[key];

    state[key] = {gridX: object.gridX, gridY: object.gridY};
  }
  this.objectStates.push(state);
}

Game.prototype.loadEvents = function(events) {
  this.events = events;
  this.eventCounter = 0;
}

Game.prototype.reset = function() {
  this.events = [];
  this.eventCounter = 0;
  this.objectStates = [this.objectStates[0]];
}

Game.prototype.executeNextEvent = function(callback) {
  // We have run out of events to execute
  if (this.eventCounter >= this.events.length) {
    if (callback) {
      callback(true);
    }
    return;
  }
  var nextEvent = this.events[this.eventCounter++];

  var updateModelAndCallback = function() {
    for (var objId in nextEvent.update) {
      this.objects[objId].updateModel(nextEvent.update[objId]);
    }
    this.addObjectState();
    if (callback) {
      callback(false);
    }
  }.bind(this);

  if (nextEvent.type === 'move') {
    var object = this.objects[nextEvent.id];
    if (!object) {
      DEBUG('Invalid id for object in event');
      return;
    }
    object.animateTo(nextEvent.xy.x, nextEvent.xy.y, updateModelAndCallback);
  } else if (nextEvent.type === 'attack') {
    var object = this.objects[nextEvent.id];
    var target = this.objects[nextEvent.target];

    if (!object || !target) {
      DEBUG('Invalid id for object or target in event');
      return;
    }

    object.animateAttack(target, updateModelAndCallback);
  } else if (nextEvent.type === 'pickCoin') {
    var charater = this.objects[nextEvent.id];
    var coin = this.objects[nextEvent.target];

    if (!charater || !coin) {
      DEBUG('Invalid id for object or target in event');
      return;
    }

    charater.animatePickCoin(coin, function() {
      // Remove coin from game
      this.objects[nextEvent.target].setGrid(-1, -1);
      updateModelAndCallback();
    }.bind(this));

  } else if (nextEvent.type === 'pickSpinach') {
    var charater = this.objects[nextEvent.id];
    var spinach = this.objects[nextEvent.target];

    if (!charater || !spinach) {
      DEBUG('Invalid id for object or target in event');
      return;
    }

    charater.animatePickSpinach(spinach, function() {
      this.objects[nextEvent.target].setGrid(-1, -1);
      updateModelAndCallback()
    }.bind(this));
  }
};

Game.prototype.gotoFrame = function(frame) {
  var state = this.objectStates[frame];
  for (var key in state) {
    var s = state[key];
    var object = this.objects[key];

    object.setGrid(s.gridX, s.gridY);
    object.repr.opacity(1.0);
  }
}

Game.prototype.executeEvents = function(callback) {
  this.executeNextEvent(function(done) {
    callback(done);
    if (!done) {
      this.executeEvents(callback);
    }
  }.bind(this));
};
