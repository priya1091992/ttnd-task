'use strict';

describe('Controller: Query2Ctrl', function () {

  // load the controller's module
  beforeEach(module('firstSecondApp'));

  var Query2Ctrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Query2Ctrl = $controller('Query2Ctrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
