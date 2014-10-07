'use strict';
/*global Kinetic:false, Grid:false, Assets:false */

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
}
Player.prototype = Object.create(Grid.prototype);

Player.prototype.animateAttack = function(target, callback) {
    this.repr.moveToTop();

    var tweenIn = {
        node: this.repr,
        duration: 0.5,
        easing: Kinetic.Easings.BackEaseIn,
        x: this.gridToReprCoord(target.gridX),
        y: this.gridToReprCoord(target.gridY),
        onFinish: function() {
            (new Kinetic.Tween(tweenOut)).play();
        }
    };

    var tweenOut = {
        node: this.repr,
        duration: 0.5,
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
