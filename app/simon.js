'use strict';

// create a new module
angular.module('simonApp', ['Game'])
.controller('GameController', function(GameManager) {
  var vm = this;
  vm.game = GameManager;
});

angular.module('Game', ['Grid'])
.service('GameManager', function(GridService, $interval, $timeout) {
  this.grid = GridService.grid;
  this.sequence = [];
  var stopPlayback; // $interval promise
  var stopBlink; // $timeout promise
  
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
      $timeout.cancel(stopBlink);
      $interval.cancel(stopPlayback);
      this.grid = GridService.reset();
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
    this.sequence = buildSequence(5);
//    console.log(this.sequence);
    // TODO: Play blinking count
      // Set current level to 1
    // TODO: Start Game loop
    do {
      this.gameLoop();
    } while(!this.gameOver);
  };
  this.gameLoop = function() {
    console.log('CALLED: gameLoop');
    var grid = this.grid;
    var sequence = this.sequence;
    // Play sequence up to current level
    if (this.currentLevel === '--') {
      this.currentLevel = '01';
    }
//    var index = 0;
    var current = +this.currentLevel;
    
    playNext(grid, sequence);
    // Listen for sequence click
      // Listen for current index/color
        // If not correct color
          // If in strict mode, game over
          // Else start over
        // Else if is the correct color
          // If it's the last item
            // Update current level
          // Else, update index to play
    this.gameOver = true;
  };
  // Handle the push click action
  this.panelClick = function(panel) {};
  // Update the round number
  this.updateRound = function() {};
  
  // Create a random sequence of numbers between 0 and 3 inclusive
  function buildSequence(size) {
    var sequence = [];
    for (var i = 0; i < size; i++) {
      sequence.push(Math.floor(Math.random() * 4));
    }
    console.log(sequence);
    return sequence;
  }

  function blink(panel) {
    panel.isActive = true;
    stopBlink = $timeout(function() {
      panel.isActive = false;
      $timeout.cancel(stopBlink);
    }, 1000);
  }
  
  function playNext(grid, sequence) {
    var i = 0;
    stopPlayback = $interval(function() {
      blink(grid[sequence[i]]);
      ++i;
      if (i >= sequence.length) {
        $interval.cancel(stopPlayback);
      }
    }, 2000);
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
