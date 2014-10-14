
describe('DragCommandController function', function() {
	describe('DragCommandController', function() {
		var $scope;

		beforeEach(module('visualide'));

		beforeEach(inject(function($rootScope, $controller) {
			$scope = $rootScope.$new();
			$controller('DragCommandController', {$scope: $scope});
		}));

		it('should create "navigation" with 4 navigation objects', function() {
			expect($scope.navigation.length).toBe(4);
		});
	});
});