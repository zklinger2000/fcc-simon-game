// create a new module
angular.module('products', [])

// register the service
.service('CategoryService', function CategoryService() {
  return {
    getCategories: function() {
      return { 1: 'Beverages', 2: 'Condiments' };
    }
  }; 
})

// register a service. **This has a dependency on the CategoryService**
.service('ProductsService', function ProductService(CategoryService) {
  return {
    getProducts: function () {
      var product1 = { name: 'Chai', categoryId: 1 };
      var product2 = { name: 'Aniseed Syrup', categoryId: 2 };
      var products = [product1, product2];

      var categories = CategoryService.getCategories();

      products.forEach(function (p) {
        // append the category name for the category service to each product.
        p.categoryName = categories[p.categoryId];
      });

      return products;
    }
  };
})

// a controller that has a dependency on the ProductsService
.controller('ProductsController', function ProductsController($scope, ProductsService) {
  $scope.products = [];
  $scope.load = function() {
    $scope.products = ProductsService.getProducts();
  };
});