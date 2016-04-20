'use strict';

describe('Controller: Query1Ctrl', function () {

  // load the controller's module
  beforeEach(module('firstSecondApp'));

  var Query1Ctrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Query1Ctrl = $controller('Query1Ctrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
