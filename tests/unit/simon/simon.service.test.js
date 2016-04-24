describe('Grid service', function () {
  
  beforeEach(module('Grid'));

  var service;
  // Get the service from the injector
  beforeEach(inject(function GetDependencies(GridService) {
    service = GridService;
  }));

  it('should return object of type array', function () {
    // call the function on our service instance
    var grid = service.grid;

    expect(Array.isArray(grid)).toBe(true);
  });

  it('should default to an empty array', function () {
    // call the function on our service instance
    var grid = service.grid;

    expect(grid).toEqual([]);
  });

  it('should return an array of objects with color values', function () {
    // call the function on our service instance
    var grid = service.reset();

    expect(grid[0].color).toEqual('green');
    expect(grid[1].color).toEqual('red');
    expect(grid[2].color).toEqual('yellow');
    expect(grid[3].color).toEqual('blue');
  });

  it('should return an array of objects with isActive set to false', function () {
    // call the function on our service instance
    var grid = service.reset();

    expect(grid[0].isActive).toEqual(false);
    expect(grid[1].isActive).toEqual(false);
    expect(grid[2].isActive).toEqual(false);
    expect(grid[3].isActive).toEqual(false);
  });

});

describe('Game module', function() {
  describe('GameManager', function() {
    // inject the Game module into this test
    beforeEach(module('Game'));
    
    // tests go here
    var gameManager; // instance of GameManager
    beforeEach(inject(function(GameManager) {
      gameManager = GameManager;
    }));

  });
});