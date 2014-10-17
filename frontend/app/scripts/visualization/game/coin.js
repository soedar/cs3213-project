'use strict';
/*global Kinetic:false, Grid:false, Assets:false */

function Coin() {
  var coinImage = Assets.coin;
  var coinScale = 0.80;

  var scale = (this.size / coinImage.width) * coinScale;

  var offsetX = -(this.size * coinScale) / 2;
  var offsetY = -this.size * coinScale;

  Grid.call(this, {}, new Kinetic.Rect({
    fillPatternImage: coinImage,
    fillPatternRepeat: 'no-repeat',
    fillPatternScale: {x: scale, y: scale},
    fillPatternOffset: {x: offsetX, y: offsetY}
  }));

}
Coin.prototype = Object.create(Grid.prototype);
