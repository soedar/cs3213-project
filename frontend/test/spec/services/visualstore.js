'use strict';

describe('Service: visualStore', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var visualStore;
  beforeEach(inject(function (_visualStore_) {
    visualStore = _visualStore_;
  }));

  it('should do something', function () {
    expect(!!visualStore).toBe(true);
  });

});
