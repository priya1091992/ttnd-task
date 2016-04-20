'use strict';

describe('Controller: Query5Ctrl', function () {

  // load the controller's module
  beforeEach(module('firstSecondApp'));

  var Query5Ctrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Query5Ctrl = $controller('Query5Ctrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
