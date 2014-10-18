'use strict';

describe('Service: gameEngine', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var gameEngine;
  beforeEach(inject(function (_gameEngine_) {
    gameEngine = _gameEngine_;
  }));

  it('should do something', function () {
    expect(!!gameEngine).toBe(true);
  });

});
