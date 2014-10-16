'use strict';
/*global Kinetic:false, Grid:false, Assets:false */

function Coin() {
    var coinImage = Assets.coin;
    var scale = this.size / coinImage.width;

    Grid.call(this, {}, new Kinetic.Rect({
        fillPatternImage: coinImage,
        fillPatternRepeat: 'no-repeat',
        fillPatternScale: {x: scale, y: scale}
    }));

}
Coin.prototype = Object.create(Grid.prototype);
