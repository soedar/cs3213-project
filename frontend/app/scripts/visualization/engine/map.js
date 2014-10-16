'use strict';
/*global _:false */

function Map(size) {
    this.mapSize = size;
    this.objects = [];
};

Map.prototype.addPlayer = function(name, color, health, xy) {
    var player = this.createObject('player', xy);
    player.model = {
        name: name,
        color: color,
        health: health,
        coin: 0,
    };

    this.objects.push(player);
};

Map.prototype.addCoin = function(xy) {
    var coin = this.createObject('coin', xy);
    coin.model = {
        value: 10
    };
    this.objects.push(coin);
};

Map.prototype.addSpinach = function(xy) {
	var spinach = this.createObject('spinach', xy);
	spinach.model = {
		value: 20
	};
	this.objects.push(spinach);
};

Map.prototype.createObject = function(type, xy) {
    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    
    return {
        type: type,
        id: uuid(),
        xy: _.clone(xy)
    };
};

