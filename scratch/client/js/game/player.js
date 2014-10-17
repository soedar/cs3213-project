'use strict';
/*global Kinetic:false, Grid:false, Assets:false, Config:false */

function Player(model) {
    var image;
    switch(model.color) {
        case 'yellow':
            image = Assets.playerYellow;
            break;
        case 'red':
            image = Assets.playerRed;
            break;
        case 'green':
            image = Assets.playerGreen;
            break;
        case 'blue':
            image = Assets.playerBlue;
            break;
    }

    if (!image) {
        DEBUG('Invalid player model');
        image = Assets.playerRed;
    }

    var scale = this.size / image.width;

    Grid.call(this, model, new Kinetic.Rect({
        fillPatternImage: image,
        fillPatternRepeat: 'no-repeat',
        fillPatternScale: {x: scale, y: scale}
    }));
	
	this.model.health = 3;
	this.model.coin = 0;
}
Player.prototype = Object.create(Grid.prototype);

Player.prototype.animateAttack = function(target, callback) {
    this.repr.moveToTop();

    var tweenIn = {
        node: this.repr,
        duration: Config.stepDuration * 0.5,
        easing: Kinetic.Easings.BackEaseIn,
        x: this.gridToReprCoord(target.gridX),
        y: this.gridToReprCoord(target.gridY),
        onFinish: function() {
            (new Kinetic.Tween(tweenOut)).play();
        }
    };

    var tweenOut = {
        node: this.repr,
        duration: Config.stepDuration * 0.5,
        easing: Kinetic.Easings.BackEaseIn,
        x: this.gridToReprCoord(this.gridX),
        y: this.gridToReprCoord(this.gridY),
        onFinish: function() {
            if (callback) {
                callback();
            }
        }.bind(this)
    };

    (new Kinetic.Tween(tweenIn)).play();
};

Player.prototype.animatePickCoin = function(coinId, callback) {
	this.repr.moveToTop();
	
	var coin = game.objects[coinId];
	var gridX = coin.gridX;
	var gridY = coin.gridY;
	this.setGrid(gridX, gridY, true);


    new Kinetic.Tween({
        node: coin.repr,
        duration: Config.stepDuration * 0.9,
        opacity: 0
    }).play();


    new Kinetic.Tween({
        node: this.repr, 
        duration: Config.stepDuration,
        x: this.gridToReprCoord(gridX),
        y: this.gridToReprCoord(gridY),
        onFinish: function() {
			coin.repr.remove();
			delete game.objects[coinId];
            if (callback) {
                callback();
            }
        }.bind(this)
    }).play();
};