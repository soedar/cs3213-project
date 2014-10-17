'use strict';
/*global Kinetic:false, Grid:false, Assets:false */

function Spinach() {
  var spinachImg = Assets.spinach;
  var scale = this.size / spinachImg.width;

  Grid.call(this, {}, new Kinetic.Rect({
    fillPatternImage: spinachImg,
    fillPatternRepeat: 'no-repeat',
    fillPatternScale: {x: scale, y: scale}
  }));

}
Spinach.prototype = Object.create(Grid.prototype);
