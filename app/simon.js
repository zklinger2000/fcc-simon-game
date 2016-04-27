'use strict';

// create a new module
angular.module('simonApp', ['Game'])
.controller('GameController', function(GameManager) {
  var vm = this;
  vm.game = GameManager;
});

angular.module('Game', ['Grid'])
.service('GameManager', function(GridService) {
  this.grid = GridService.grid;
  this.sequence = [];
  
  // METHODS
  
  // Set game state to 'off'
  this.turnOff = function() {
    this.isOn = false;
    this.currentLevel = '--';
    this.isRunning = false;
  }
  // Create a new game
  this.turnOn = function() {
    this.gameOver = false;
    this.timeout = false;
    this.isOn = true;
    this.strict = false;
    // TODO: create color sequence
  }
  // Toggle game state between on/off
  this.onOffToggle = function() {
    if (this.isOn) {
      this.turnOff();
    } else {
      this.turnOn();
    }
  }
  // Start a new game
  this.startGame = function() {
    // Disable button if game is off
    if (!this.isOn) return;
    // Disable button if game is already running
    if (this.isRunning) return;
    // Set game state to isRunning
    this.isRunning = true;
    // Create a random sequence
    buildSequence(this.sequence, 5);
    console.log(this.sequence);
  };
  // Handle the push click action
  this.panelClick = function(panel) {};
  // Update the round number
  this.updateRound = function() {};
  
  // Create a random sequence of numbers between 0 and 3 inclusive
  function buildSequence(array, size) {
    for (var i = 0; i < size; i++) {
      array.push(Math.floor(Math.random() * 4));
    }
  }

  // INITIALIZE
  this.turnOff();
});

// register the Grid module
angular.module('Grid', [])
// Panel factory
.factory('PanelModel', function() {
  var Panel = function(color, isActive) {
    this.color = color;
    this.isActive = isActive;
  };
  
  return Panel;
})
// Grid service
.service('GridService', function(PanelModel) {
  this.grid = [];
  
  // METHODS
  
  // Reset the grid
  this.reset = function() {
    var newGrid = [];
    newGrid.push(new PanelModel('green', false));
    newGrid.push(new PanelModel('red', false));
    newGrid.push(new PanelModel('yellow', false));
    newGrid.push(new PanelModel('blue', false));
   
    return newGrid;
  };
  
  // INITIALIZE
  this.grid = this.reset();
});
