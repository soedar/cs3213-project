'use strict';
/*global Kinetic:false, AssetManager:false, Game:false, $*/

var DEBUG = function(str) {
    console.log(str);
};


var stage = new Kinetic.Stage({
    container: 'container',
    width: 500,
    height: 500
});

var Assets = new AssetManager();
var nextEvent = null;
var game;
var Config = {
    stepDuration: 0.5
};

Assets.load(function() {
    $.get('player.json', function(playerMoves) {
        var map = new Map(4);
        map.addPlayer("testPlayer", "blue", 100, {x: 0, y: 2});
        map.addCoin({x: 1, y: 2});
        map.addCoin({x: 2, y: 2});
		map.addSpinach({x: 1, y: 0});
        var engine = new Engine(map, playerMoves);

        var gameData = engine.run();

        game = new Game(gameData, 500);
        game.getLayers().forEach(function(layer) {
            stage.add(layer);
        });
    });
    
});
