'use strict';

var ASSET_PREFIX = 'game_images/';
var ASSET_LIST = {  grass: 'grass.jpg',
                    coin: 'coin.png',
					spinach: 'spinach.png',
                    playerBlue: 'ninja-blue.png',
                    playerRed: 'ninja-red.png',
                    playerGreen: 'ninja-green.png',
                    playerYellow: 'ninja-yellow.png'};

function AssetManager(assetList) {
    this.assetList = (!assetList) ? ASSET_LIST : assetList;
}

AssetManager.prototype.load = function(callback) {
    var nImages = 0;
    for (var asset in this.assetList) {
        nImages++;
    }

    var nLoaded = 0;
    for (var asset in this.assetList) {
        this[asset] = new Image();
        this[asset].onload = function() {
            if (++nLoaded >= nImages) {
                callback();
            }
        };
        
        this[asset].src = ASSET_PREFIX + this.assetList[asset];
    }
};
