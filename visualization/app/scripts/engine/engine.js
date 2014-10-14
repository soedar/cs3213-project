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
        gameOutput.events.push(this.makeEvent(action, player, objectsMemory));
    }.bind(this));

    return gameOutput;
};

Engine.prototype.makeEvent = function(action, player, objectsMemory) {
    if (action.command === 'Move') {
        player.model.health -= 1;

        switch(action.direction) {
            case 'Left':
                player.xy.x -= action.steps;
                break;
            case 'Right':
                player.xy.x += action.steps;
                break;
            case 'Up':
                player.xy.y -= action.steps;
                break;
            case 'Down':
                player.xy.y += action.steps;
                break;
        }

        player.xy.x = player.xy.x % this.map.mapSize;
        player.xy.y = player.xy.y % this.map.mapSize;

        if (player.xy.x < 0) {
            player.xy.x += this.map.mapSize;
        }
        if (player.xy.y < 0) {
            player.xy.y += this.map.mapSize;
        }

        var e = {
            type: 'move',
            id: player.id,
            xy: _.clone(player.xy),
            update: {}
        };
        e.update[player.id] = {health: player.model.health};
        return e;
    }
};
