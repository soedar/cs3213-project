'use strict';

/**
* @ngdoc function
* @name frontendApp.controller:MapMakerCtrl
* @description
* # MapMakerCtrl
* Controller of the frontendApp
*/
angular.module('frontendApp')
.controller('MapMakerCtrl', function ($scope, $state, $http, visualStore, gameEngine, levelViewer, CustomMap) {

    // $scope.customMaps = CustomMap.find({
    //     filter: {
    //         where: {gamerId: $scope.$parent.gamer.id}
    //     }
    // });

    var mapSize = 4;

    $scope.leftGrid = [];
    $scope.rightGrid = [];
    $scope.leftMap = [];
    $scope.rightMap = [];

    var index=0;
    for (var xCoord = 0; xCoord < mapSize; xCoord++){
        for (var yCoord = 0; yCoord < mapSize; yCoord++){
            $scope.leftGrid.push({index: index, x: xCoord, y: yCoord});
            $scope.rightGrid.push({index: index, x: xCoord, y: yCoord});
            index++;
        }
    }

    $scope.objectList=[
        {type: 'coin'},
        //{ 'grass'},
        //Grass is not used, and it is .jpg instead of .png
        {type: 'spinach'},
        {type: 'wall'}
    ];

    $scope.playerColors = [
        {type: 'ninja-blue'},
        {type: 'ninja-red'},
        {type: 'ninja-yellow'},
        {type: 'ninja-green'}
    ];

    $scope.dropped = function(){
        console.log("Dropped: " + JSON.stringify($scope.leftGrid));
    }

    $scope.$watchCollection('leftGrid', function(newObj, oldObj){
        for (var i=0; i< mapSize * mapSize; i++){
            $scope.leftGrid[i].x = Math.floor(i/mapSize);
            $scope.leftGrid[i].y = i % mapSize;
            if (newObj[i].hasOwnProperty('type')){
                $scope.leftGrid[i].type = newObj[i].type;
            }
            console.log("$watchCollection: " + JSON.stringify($scope.leftGrid[i]));
        }
    });

    $scope.saveMap = function(){
        $scope.leftMap = $scope.leftGrid;
        console.log(JSON.stringify($scope.leftMap));

        $scope.rightMap = $scope.rightGrid;
        console.log(JSON.stringify($scope.rightMap));

        var map = {
            leftMap: $scope.leftMap,
            rightMap: $scope.rightMap
        };

        // var gamerId = $scope.$parent.gamer.id;

        // var data = {
        //     map: map,
        //     gamerId: gamerId,
        //     name: 'custommap123'
        // };

        // var customMap = CustomMap.create(data);

        // $scope.customMaps = CustomMap.find({
        //     filter: {
        //         where: {gamerId: $scope.$parent.gamer.id}
        //     }
        // });
    };

    $scope.clearMap = function(){
        $scope.leftGrid = [];
        $scope.rightGrid = [];
        $scope.leftMap = [];
        $scope.rightGrid = [];

        var index=0;
        for (var xCoord = 0; xCoord < mapSize; xCoord++){
            for (var yCoord = 0; yCoord < mapSize; yCoord++){
                $scope.leftGrid.push({index: index, x: xCoord, y: yCoord});
                $scope.rightGrid.push({index: index, x: xCoord, y: yCoord});
                index++;
            }
        }
    };

    $scope.sendData = function(){
        // For now, assume that the map is default
        var commands = getCommands();
        console.log(commands);
        var map = gameEngine.defaultMap($scope.ninjaColor);

        var data = {commands: commands, map: map};
        $http.post('api/Commands', data)
        .success(function(data) {
            $state.go('visualizer', {id: data.id});
        }).error(function(data) {
            alert('Error saving to server');
        });
    };


});
