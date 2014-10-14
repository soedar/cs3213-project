'use strict';

var DEBUG = function(str) {
    console.log(str);
};

$.get('player.json', function(player) {
    var map = new Map(4);
    map.addPlayer("testPlayer", "blue", 100, {x: 0, y: 2});

    DEBUG(map);
    DEBUG(player);

    var engine = new Engine(map, player);
    DEBUG(engine.run());
});
