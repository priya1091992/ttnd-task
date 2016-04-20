'use strict';

describe('Controller: Query3Ctrl', function () {

  // load the controller's module
  beforeEach(module('firstSecondApp'));

  var Query3Ctrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Query3Ctrl = $controller('Query3Ctrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
