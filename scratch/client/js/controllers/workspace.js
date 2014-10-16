(function(){

    var app = angular.module('visualide', ['ngDragDrop']);

    app.controller('DragCommandController', ['$scope',function($scope){
        // $scope.list1 = {title: 'AngularJS - Drag Me'};
        // $scope.list2 = {};

        $scope.navigation = [
            {'command':'Move', 'direction':'Up','steps':0},
            {'command':'Move', 'direction':'Down','steps':0},
            {'command':'Move', 'direction':'Left','steps':0},
            {'command':'Move', 'direction':'Right','steps':0}
        ];

        $scope.commandsWorkspace = [];

        $scope.hideMe = function() {
		    return $scope.commandsWorkspace.length > 0;
		  }

		$scope.sendData = function(){
			console.log(JSON.stringify($scope.commandsWorkspace));
		};

        $scope.removeCommands = function(index) {
          $scope.commandsWorkspace.splice(index, 1);
        };

        $scope.clearCommands = function() {
            $scope.commandsWorkspace = [];
        };

    }]);

})();
