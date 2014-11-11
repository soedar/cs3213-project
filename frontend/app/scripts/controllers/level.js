angular.module('frontendApp')
  .controller('LevelCtrl',
    function($scope, $stateParams, Level) {
      var levelId = $stateParams.id;
      var level = Level.findOne(
        {
          filter: {
            where: {id: levelId},
          }
        }, function success (val, res) {
          $scope.level = level;
          console.log('success retrieving level');
        }, function error (res) {
          $scope.errResponse = "Level is not in database. Check your level id";
          console.log('level is not in database');
        }
      );
    });