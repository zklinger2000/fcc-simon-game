'use strict';

// create a new module
angular.module('simonApp', ['Game'])
.controller('GameController', function(GameManager) {
  this.game = GameManager;
});

angular.module('Game', ['Grid'])
.service('GameManager', function(GridService) {
  this.grid = GridService.grid;
  
  this.newGame = function() {
    GridService.buildSimon();
    this.reinit();
  };
  
  this.reinit = function() {
    this.gameOver = false;
    this.timeout = false;
    this.currentLevel = '--';
  };
  // Create a new game
  this.reset = function() {};
  // Handle the move action
  this.move = function() {};
  // Update the score
  this.updateScore = function(newScore) {};
  // Are there moves left?
  this.movesAvailable = function() {};
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
  this.reset = function() {
    var newGrid = [];
    newGrid.push(new PanelModel('green', false));
    newGrid.push(new PanelModel('red', false));
    newGrid.push(new PanelModel('yellow', false));
    newGrid.push(new PanelModel('blue', false));
   
    return newGrid;
  };
  // initialize grid
  this.grid = this.reset();
});
