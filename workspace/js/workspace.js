(function(){

    var app = angular.module('visualide', ['ngDragDrop']);
    
    app.controller('DragCommandController', ['$scope',function($scope, $timeout){
        // $scope.list1 = {title: 'AngularJS - Drag Me'};
        // $scope.list2 = {};

       
       // console.log($scope.stepsValue);
        $scope.stepsValue = 0;
        $scope.navigation = [{'command':'Move', 'direction':'Up','steps':0},{'command':'Move', 'direction':'Down','steps':0},{'command':'Move', 'direction':'Left','steps':0},{'command':'Move', 'direction':'Right','steps':0}]
        $scope.commandsWorkspace = [];
     	$scope.hideMe = function() {
		    return $scope.commandsWorkspace.length > 0;
		  }
		$scope.sendStepsValue = function(){
			//console.log('in function' + $scope.stepsValue);
		}
		$scope.sendData = function(){
			console.log($scope.commandsWorkspace);
		}
    }]);

})();


