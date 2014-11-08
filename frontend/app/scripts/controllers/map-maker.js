'use strict';

/**
* @ngdoc function
* @name frontendApp.controller:MapMakerCtrl
* @description
* # MapMakerCtrl
* Controller of the frontendApp
*/
angular.module('frontendApp')
.controller('MapMakerCtrl', function ($scope, $state, $http, visualStore, gameEngine, levelViewer, CustomMap, Gamer) {
    var mapSize = 4;

    $scope.leftGrid = [];

    $scope.rightGrid = [];

    for (var xCoord = 0; xCoord < mapSize; xCoord++){
        for (var yCoord = 0; yCoord < mapSize; yCoord++){
            $scope.leftGrid.push({x: xCoord, y: yCoord});
            $scope.rightGrid.push({x: xCoord, y: yCoord});
        }
    }

    $scope.left0 = {};
    $scope.left1 = {};
    $scope.left2 = {};
    $scope.left3 = {};
    $scope.left4 = {};
    $scope.left5 = {};
    $scope.left6 = {};
    $scope.left7 = {};
    $scope.left8 = {};
    $scope.left9 = {};
    $scope.left10 = {};
    $scope.left11 = {};
    $scope.left12 = {};
    $scope.left13 = {};
    $scope.left14 = {};
    $scope.left15 = {};


    $scope.$watch('left0', function(itemType){
        $scope.left0.x = "0";
        $scope.left0.y = "0";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left0));
    });

    $scope.$watch('left1', function(itemType){
        $scope.left1.x = "0";
        $scope.left1.y = "1";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left1));
    });

    $scope.$watch('left2', function(itemType){
        $scope.left2.x = "0";
        $scope.left2.y = "2";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left2));
    });

    $scope.$watch('left3', function(itemType){
        $scope.left3.x = "0";
        $scope.left3.y = "3";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left3));
    });

    $scope.$watch('left4', function(itemType){
        $scope.left4.x = "1";
        $scope.left4.y = "0";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left4));
    });

    $scope.$watch('left5', function(itemType){
        $scope.left5.x = "1";
        $scope.left5.y = "1";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left5));
    });

    $scope.$watch('left6', function(itemType){
        $scope.left6.x = "1";
        $scope.left6.y = "2";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left6));
    });

    $scope.$watch('left7', function(itemType){
        $scope.left7.x = "1";
        $scope.left7.y = "3";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left7));
    });

    $scope.$watch('left8', function(itemType){
        $scope.left8.x = "2";
        $scope.left8.y = "0";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left8));
    });

    $scope.$watch('left9', function(itemType){
        $scope.left9.x = "2";
        $scope.left9.y = "1";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left9));
    });

    $scope.$watch('left10', function(itemType){
        $scope.left10.x = "2";
        $scope.left10.y = "2";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left10));
    });

    $scope.$watch('left11', function(itemType){
        $scope.left11.x = "2";
        $scope.left11.y = "3";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left11));
    });

    $scope.$watch('left12', function(itemType){
        $scope.left12.x = "3";
        $scope.left12.y = "0";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left12));
    });

    $scope.$watch('left13', function(itemType){
        $scope.left13.x = "3";
        $scope.left13.y = "1";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left13));
    });

    $scope.$watch('left14', function(itemType){
        $scope.left14.x = "3";
        $scope.left14.y = "2";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left14));
    });

    $scope.$watch('left15', function(itemType){
        $scope.left15.x = "3";
        $scope.left15.y = "3";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.left15));
    });

    $scope.right0 = {};
    $scope.right1 = {};
    $scope.right2 = {};
    $scope.right3 = {};
    $scope.right4 = {};
    $scope.right5 = {};
    $scope.right6 = {};
    $scope.right7 = {};
    $scope.right8 = {};
    $scope.right9 = {};
    $scope.right10 = {};
    $scope.right11 = {};
    $scope.right12 = {};
    $scope.right13 = {};
    $scope.right14 = {};
    $scope.right15 = {};


    $scope.$watch('right0', function(itemType){
        $scope.right0.x = "0";
        $scope.right0.y = "0";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right0));
    });

    $scope.$watch('right1', function(itemType){
        $scope.right1.x = "0";
        $scope.right1.y = "1";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right1));
    });

    $scope.$watch('right2', function(itemType){
        $scope.right2.x = "0";
        $scope.right2.y = "2";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right2));
    });

    $scope.$watch('right3', function(itemType){
        $scope.right3.x = "0";
        $scope.right3.y = "3";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right3));
    });

    $scope.$watch('right4', function(itemType){
        $scope.right4.x = "1";
        $scope.right4.y = "0";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right4));
    });

    $scope.$watch('right5', function(itemType){
        $scope.right5.x = "1";
        $scope.right5.y = "1";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right5));
    });

    $scope.$watch('right6', function(itemType){
        $scope.right6.x = "1";
        $scope.right6.y = "2";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right6));
    });

    $scope.$watch('right7', function(itemType){
        $scope.right7.x = "1";
        $scope.right7.y = "3";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right7));
    });

    $scope.$watch('right8', function(itemType){
        $scope.right8.x = "2";
        $scope.right8.y = "0";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right8));
    });

    $scope.$watch('right9', function(itemType){
        $scope.right9.x = "2";
        $scope.right9.y = "1";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right9));
    });

    $scope.$watch('right10', function(itemType){
        $scope.right10.x = "2";
        $scope.right10.y = "2";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right10));
    });

    $scope.$watch('right11', function(itemType){
        $scope.right11.x = "2";
        $scope.right11.y = "3";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right11));
    });

    $scope.$watch('right12', function(itemType){
        $scope.right12.x = "3";
        $scope.right12.y = "0";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right12));
    });

    $scope.$watch('right13', function(itemType){
        $scope.right13.x = "3";
        $scope.right13.y = "1";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right13));
    });

    $scope.$watch('right14', function(itemType){
        $scope.right14.x = "3";
        $scope.right14.y = "2";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right14));
    });

    $scope.$watch('right15', function(itemType){
        $scope.right15.x = "3";
        $scope.right15.y = "3";
        $scope.type = itemType;
        //console.log(JSON.stringify($scope.right15));
    });

    $scope.objectList=[
        {type: "coin"},
        //{ "grass"},
        //Grass is not used, and it is .jpg instead of .png
        {type: "spinach"},
        {type: "wall"}
    ];

    $scope.leftMap = [];
    $scope.rightMap = [];

    // $scope.selectedObject = $scope.operators[0];
    // $scope.$watch('selectedObject', function(value) {
    //     console.log(value);
    //    // console.log($scope.selectedObject);
    //    $scope.controlCommands[0].operator = $scope.selectedObject;
    //    //console.log($scope.controlCommands[0]);
    // });


    $scope.playerColors = [
        {type: 'ninja-blue'},
        {type: 'ninja-red'},
        {type: 'ninja-yellow'},
        {type: 'ninja-green'}
    ];

    $scope.saveMap = function(){
        $scope.leftMap.push($scope.left0);
        $scope.leftMap.push($scope.left1);
        $scope.leftMap.push($scope.left2);
        $scope.leftMap.push($scope.left3);
        $scope.leftMap.push($scope.left4);
        $scope.leftMap.push($scope.left5);
        $scope.leftMap.push($scope.left6);
        $scope.leftMap.push($scope.left7);
        $scope.leftMap.push($scope.left8);
        $scope.leftMap.push($scope.left9);
        $scope.leftMap.push($scope.left10);
        $scope.leftMap.push($scope.left11);
        $scope.leftMap.push($scope.left12);
        $scope.leftMap.push($scope.left13);
        $scope.leftMap.push($scope.left14);
        $scope.leftMap.push($scope.left15);
        console.log(JSON.stringify($scope.leftMap));

        $scope.rightMap.push($scope.right0);
        $scope.rightMap.push($scope.right1);
        $scope.rightMap.push($scope.right2);
        $scope.rightMap.push($scope.right3);
        $scope.rightMap.push($scope.right4);
        $scope.rightMap.push($scope.right5);
        $scope.rightMap.push($scope.right6);
        $scope.rightMap.push($scope.right7);
        $scope.rightMap.push($scope.right8);
        $scope.rightMap.push($scope.right9);
        $scope.rightMap.push($scope.right10);
        $scope.rightMap.push($scope.right11);
        $scope.rightMap.push($scope.right12);
        $scope.rightMap.push($scope.right13);
        $scope.rightMap.push($scope.right14);
        $scope.rightMap.push($scope.right15);
        console.log(JSON.stringify($scope.rightMap));

        var map = {
            leftMap: $scope.leftMap,
            rightMap: $scope.rightMap
        };

        var gamerId = $scope.$parent.gamer.id;

        var data = {
            map: map,
            gamerId: gamerId
        };

        var customMap = CustomMap.create(data);
        console.log(customMap);
    }

    $scope.clearMap = function(){
        $scope.right0 = {};
        $scope.right1 = {};
        $scope.right2 = {};
        $scope.right3 = {};
        $scope.right4 = {};
        $scope.right5 = {};
        $scope.right6 = {};
        $scope.right7 = {};
        $scope.right8 = {};
        $scope.right9 = {};
        $scope.right10 = {};
        $scope.right11 = {};
        $scope.right12 = {};
        $scope.right13 = {};
        $scope.right14 = {};
        $scope.right15 = {};
        $scope.left0 = {};
        $scope.left1 = {};
        $scope.left2 = {};
        $scope.left3 = {};
        $scope.left4 = {};
        $scope.left5 = {};
        $scope.left6 = {};
        $scope.left7 = {};
        $scope.left8 = {};
        $scope.left9 = {};
        $scope.left10 = {};
        $scope.left11 = {};
        $scope.left12 = {};
        $scope.left13 = {};
        $scope.left14 = {};
        $scope.left15 = {};
        $scope.leftMap = [];
        $scope.rightMap = [];
    }

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
