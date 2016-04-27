describe('Grid panel factory', function () {
  
  beforeEach(module('Grid'));

  var panel;
  // Get the Panel factory from the injector
  beforeEach(inject(function GetDependencies(PanelModel) {
    panel = new PanelModel('red', true);
  }));

  it('should be an object with color set to "red"', function () {

    expect(panel.color).toEqual('red');
  });

  it('should be an object with isActive set to false', function () {

    expect(panel.isActive).toEqual(true);
  });

});
         
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

  it('should return an array of objects with color values', function () {
    // call the function on our service instance
    var grid = service.reset();

    expect(grid[0].color).toEqual('green');
    expect(grid[1].color).toEqual('red');
    expect(grid[2].color).toEqual('yellow');
    expect(grid[3].color).toEqual('blue');
  });

  it('should default to an array of objects with color values', function () {
    // call the function on our service instance
    var grid = service.grid;

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
    var game; // instance of GameManager
    beforeEach(inject(function(GameManager) {
      game = GameManager;
    }));

    describe('grid', function() {

      it('should return object of type array', function () {
        // call the function on our service instance
        var grid = game.grid;

        expect(Array.isArray(grid)).toBe(true);
      });

    });

    describe('turnOff', function() {

      it('should reset game state values', function () {
        // call the function on our service instance
        game.turnOff();
        expect(game.isOn).toEqual(false);
        expect(game.isRunning).toEqual(false);
      });

    });

    describe('turnOn', function() {

      it('should show correct game state values', function () {
        // call the function on our service instance
        game.turnOn();
        expect(game.gameOver).toEqual(false);
        expect(game.timeout).toEqual(false);
        expect(game.currentLevel).toEqual('--');
        expect(game.isOn).toEqual(true);
        expect(game.strict).toEqual(false);
        expect(game.isRunning).toEqual(false);
      });

    });

    describe('onOffToggle', function() {

      it('should show correct game state values', function () {
        // call the function on our service instance
        if (game.isOn) {
          game.onOffToggle();
          expect(game.gameOver).toEqual(false);
          expect(game.timeout).toEqual(false);
          expect(game.currentLevel).toEqual('--');
          expect(game.isOn).toEqual(false);
          expect(game.strict).toEqual(false);
        } else {
          game.onOffToggle();
          expect(game.gameOver).toEqual(false);
          expect(game.timeout).toEqual(false);
          expect(game.currentLevel).toEqual('--');
          expect(game.isOn).toEqual(true);
          expect(game.strict).toEqual(false);
        }
      });

    });

    describe('sequence', function() {

      it('should be an object of type array', function () {
        var sequence = game.sequence;
        // 
        expect(Array.isArray(sequence)).toBe(true);
      });

      it('should default to be empty', function () {
        var sequence = game.sequence;
        // 
        expect(sequence.length).toEqual(0);
      });

    });

    describe('startGame', function() {
      
      describe('sequence', function() {

        it('should have a length of 0 if game is not On', function () {
          game.turnOff();
          game.startGame();
          
          var sequence = game.sequence;
          // 
          expect(sequence.length).toEqual(0);
        });

        it('should have a length of 5 when On', function () {
          game.turnOn();
          game.startGame();
          
          var sequence = game.sequence;
          // 
          expect(sequence.length).toEqual(5);
        });

      });

      describe('isRunning', function() {

        it('should be true if game is started', function () {
          game.turnOn();
          game.startGame();
          
          var isRunning = game.isRunning;
          // 
          expect(isRunning).toEqual(true);
        });

      });

    });

  });
});