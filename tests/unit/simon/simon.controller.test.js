describe('simonApp module', function () {

  beforeEach(module('simonApp'));
//  beforeEach(module('Game')); // not needed?

  var gameManager; // instance of GameManager service

  beforeEach(inject(function(GameManager) {
    gameManager = GameManager;
  }));

  /*
  // Example of a 'mock' service
  // You must remove the GameManager param 
  // from inject below for this mock one to work
  var GameManager = { 
      grid: [{
        color: 'green',
        isActive: false
      }, {
        color: 'red',
        isActive: false
      }, {
        color: 'yellow',
        isActive: false
      }, {
        color: 'blue',
        isActive: false
      }] 
    };
  // then...
  beforeEach(inject(function() {
    gameManager = GameManager;
  }));
  */
  
  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('game controller', function () {
    
    describe('reinit', function () {
      
      it('should reset game state values', function () {
        var vm = $controller('GameController', { GameManager: gameManager });
        vm.game.reinit();
        expect(vm.game.gameOver).toEqual(false);
        expect(vm.game.timeout).toEqual(false);
        expect(vm.game.currentLevel).toEqual('--');
        expect(vm.game.isOn).toEqual(false);
        expect(vm.game.strict).toEqual(false);
      }); 

    });

    describe('grid', function () {
      
      it('should be loaded to game', function () {
        var vm = $controller('GameController', { GameManager: gameManager });

        expect(vm.game.grid[0].color).toEqual('green');
        expect(vm.game.grid[1].color).toEqual('red');
        expect(vm.game.grid[2].color).toEqual('yellow');
        expect(vm.game.grid[3].color).toEqual('blue');
      }); 

    });

  });
});