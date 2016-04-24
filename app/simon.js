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
  
  // METHODS
  
  this.turnOff = function() {
    this.gameOver = false;
    this.timeout = false;
    this.currentLevel = '  ';
    this.isOn = false;
    this.strict = false;
  }
  // Create a new game
  this.turnOn = function() {
    this.currentLevel = '--';
    this.isOn = true;
  }
  // Start a new game
  this.startGame = function() {
//    GridService.buildSimon();
  };
  // Handle the push click action
  this.panelClick = function(panel) {};
  // Update the round number
  this.updateRound = function() {};

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
