'use strict';

describe('Controller: TabcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var TabcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TabcontrollerCtrl = $controller('TabcontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
