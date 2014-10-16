'use strict';

var ASSET_LIST = {  grass: 'images/game/grass.jpg',
                    coin: 'images/game/coin.png',
					spinach: 'images/game/spinach.png',
                    playerBlue: 'images/game/ninja-blue.png',
                    playerRed: 'images/game/ninja-red.png',
                    playerGreen: 'images/game/ninja-green.png',
                    playerYellow: 'images/game/ninja-yellow.png'};

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
        
        this[asset].src = this.assetList[asset];
    }
};
