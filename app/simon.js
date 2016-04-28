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
  var roundTimeout; // $timeout promise
  
  // METHODS
  
  // Set game state to 'off'
  this.turnOff = function() {
    this.isOn = false;
    this.currentLevel = '--';
    this.isRunning = false;
    this.isListening = false;
    this.strict = false;
    $timeout.cancel(roundTimeout);
  };
  // Create a new game
  this.turnOn = function() {
    this.gameOver = false;
    this.timeout = false;
    this.isOn = true;
    this.strict = false;
    // TODO: create color sequence
  };
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
  };
  this.strictToggle = function() {
    if (!this.isOn) return;
    this.strict = !this.strict;
  };
  // Start a new game
  this.startGame = function() {
    // Disable button if game is off
    if (!this.isOn) return;
    // Disable button if game is already running
    if (this.isRunning) return;
    // Set game state to isRunning
    this.isRunning = true;
    // Create a random sequence
    this.sequence = [];
    // TODO: Play blinking count
      // Set current level to 1
    // TODO: Start Game loop
    this.newRound();
  };
  this.newRound = function() {
    console.log('CALLED: gameLoop');
    var grid = this.grid;
    var sequence = this.sequence;
    sequence.push(addRound());
    // Play sequence up to current level
    if (this.currentLevel === '--') {
      this.currentLevel = 1;
    } else {
      // TODO: timeout level change
      ++this.currentLevel;
    }    
    playNext(this, grid, sequence);
  };
  // Check results of clicking a panel
  this.checkClick = function(answer, input) {
    if (answer === input) {
      console.log('that was correct!');
      if (clickResults.round < this.sequence.length - 1) {
        console.log('still another color in sequence');
        this.startListening();
        ++clickResults.round;
      } else {
        console.log('that was the last color!');
        clickResults.round = 0;
        // TODO: blink round timeout
        this.newRound();
      }
    } else {
      console.log('incorrect click!!!');
      self.isListening = false;
      if (self.strict) {
        console.log('incorrect click loss!');
        self.currentLevel = '!!';
      } else {
        console.log('incorrect click non-strict');
        // TODO: blink '!!' timeout
        playNext(this, this.grid, this.sequence);        
      }
    }
  };
  
  var clickResults = {
    round: 0,
    clicked: undefined
  };
  // Handle the push click action
  this.panelClick = function(panel, index) {
    if (this.isListening) {
      console.log('clicked!!!!');
      this.isListening = false;
      blink(panel);
      $timeout.cancel(roundTimeout);
      roundTimeout = undefined;
      var correctPanel = this.sequence[clickResults.round];
      this.checkClick(correctPanel, index);
    }
  };
  // Update the round timer and activate listener
  this.startListening = function() {
    var self = this;
    var grid = self.grid;
    var sequence = self.sequence;
    
    self.isListening = true;
    roundTimeout = $timeout(function() {
      self.isListening = false;
      if (self.strict) {
        console.log('timeout loss!');
        // TODO: blink '!!'
        self.currentLevel = '!!';
      } else {
        console.log('timeout non-strict');
        // TODO: blink '!!'
        playNext(self, grid, sequence);        
      }
    }, 4000, self);
  };
  
  // Create a random sequence of numbers between 0 and 3 inclusive
  function addRound() {
    return Math.floor(Math.random() * 4);
  }

  function blink(panel) {
    panel.isActive = true;
    stopBlink = $timeout(function() {
      panel.isActive = false;
      $timeout.cancel(stopBlink);
    }, 1000);
  }
  
  function playNext(game, grid, sequence) {
    var i = 0;
    stopPlayback = $interval(function() {
      blink(grid[sequence[i]]);
      ++i;
      if (i >= sequence.length) {
        $interval.cancel(stopPlayback);
        $timeout(function() {
          game.startListening();
        }, 1000, game);
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
