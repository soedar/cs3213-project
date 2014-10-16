'use strict';
/*global Config:false */

function Grid(model, repr) {
  this.gridX = 0;
  this.gridY = 0;

  this.repr = repr;
  this.model = (model) ? model : {};
  this.repr.size({width: this.size, height: this.size});
}

Grid.prototype.setGridX = function(gridX) {
  this.setGrid(gridX, this.gridY);
};

Grid.prototype.setGridY = function(gridY) {
  this.setGrid(this.gridX, gridY);
};

Grid.prototype.updateModel = function(model) {
  for (var key in model) {
    this.model[key] = model[key];
  }
};

Grid.prototype.setGrid = function(gridX, gridY, shallow) {
  this.gridX = gridX;
  this.gridY = gridY;

  if (!shallow) {
    this.repr.setX(this.gridToReprCoord(gridX));
    this.repr.setY(this.gridToReprCoord(gridY));

    // Automatically move the object if parent layer exist
    if (this.repr.parent) {
      this.repr.parent.draw();
    }
  }
};

Grid.prototype.animateTo = function(gridX, gridY, callback) {
  this.setGrid(gridX, gridY, true);

  new Kinetic.Tween({
    node: this.repr,
      duration: Config.stepDuration,
      x: this.gridToReprCoord(gridX),
      y: this.gridToReprCoord(gridY),
      onFinish: function() {
        if (callback) {
          callback();
        }
      }.bind(this)
  }).play();
};

Grid.prototype.gridToReprCoord = function(grid) {
  return grid * (this.size-1);
};
