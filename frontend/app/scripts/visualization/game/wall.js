'use strict';
/*global Kinetic:false, Grid:false, Assets:false */

function Wall() {
  var image = Assets.wall;
  var scale = 1;

  var scale = (this.size / image.width) * scale;

  Grid.call(this, {}, new Kinetic.Rect({
    fillPatternImage: image,
    fillPatternScale: {x: scale, y: scale},
  }));

}
Wall.prototype = Object.create(Grid.prototype);
