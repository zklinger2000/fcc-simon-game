describe('products module', function () {

  beforeEach(module('products'));

  beforeEach(angular.mock.module({
    'ProductsService': { 
      getProducts: function() { 
        return [{ name: 'Aniseed Syrup', categoryId: 2, categoryName: 'Condiments' }]; 
      }
    }
  }));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('load', function () {
    it('products should be loaded to scope', function () {
      var $scope = {};
      var controller = $controller('ProductsController', { $scope: $scope });
      $scope.load();
      expect($scope.products).toEqual([{ name: 'Aniseed Syrup', categoryId: 2, categoryName: 'Condiments' }]);
    }); 

    it('products should default to empty array', function () {
      var $scope = {};
      var controller = $controller('ProductsController', { $scope: $scope });
      expect($scope.products).toEqual([]);
    });
  });

});