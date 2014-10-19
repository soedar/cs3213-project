var app = angular.module('login', ['facebook']);

app.config([
  'FacebookProvider',
  function(FacebookProvider) {
    var myAppId = '1567060866849242';
    FacebookProvider.init(myAppId);
  }
])

.controller('LoginController', ['$scope','$timeout','Facebook',
  function($scope, $timeout, Facebook) {

    $scope.user = {};
    $scope.logged = false;

    $scope.byebye = false;
    $scope.salutation = false;

    /**
     * Watch for Facebook to be ready.
     * There's also the event that could be used
     */
    $scope.$watch(
      function() {
        return Facebook.isReady();
      },
      function(newVal) {
        if (newVal)
          $scope.facebookReady = true;
      }
    );

    var userIsConnected = false;

    Facebook.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        userIsConnected = true;
        $scope.logged = true;
        $scope.login();
      }
    });

    $scope.IntentLogin = function() {
      if(!userIsConnected) {
        $scope.login();
      }
    };

   $scope.login = function() {
     Facebook.login(function(response) {
      if (response.status == 'connected') {
        $scope.logged = true;
        $scope.me();
      }
    });
   };

    $scope.me = function() {
      Facebook.api('/me', function(response) {
        /**
         * Using $scope.$apply since this happens outside angular framework.
         */
        $scope.$apply(function() {
          $scope.user = response;
        });
      });
    };

    $scope.logout = function() {
      Facebook.logout(function() {
        $scope.$apply(function() {
          $scope.user   = {};
          $scope.logged = false;
        });
      });
    };

    $scope.$on('Facebook:statusChange', function(ev, data) {
      console.log('Status: ', data);
      if (data.status == 'connected') {
        $scope.$apply(function() {
          $scope.salutation = true;
          $scope.byebye     = false;
        });
      } else {
        $scope.$apply(function() {
          $scope.salutation = false;
          $scope.byebye     = true;

          $timeout(function() {
            $scope.byebye = false;
          }, 3000)
        });
      }
    });
  }
])

/**
 * Just for debugging purposes.
 * Shows objects in a pretty way
 */
.directive('debug', function() {
  return {
    restrict: 'E',
    scope: {
      expression: '=val'
    },
    template: '<pre>{{debug(expression)}}</pre>',
    link: function(scope) {
      // pretty-prints
      scope.debug = function(exp) {
        return angular.toJson(exp, true);
      };
    }
  }
});

