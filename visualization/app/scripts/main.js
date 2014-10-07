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

Assets.load(function() {
    $.get('input.json', function(gameData) {
        game = new Game(gameData, 500);
        console.log(gameData);

        game.getLayers().forEach(function(layer) {
            stage.add(layer);
        });
    });
});
