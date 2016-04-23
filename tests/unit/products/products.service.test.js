describe('products category service', function () {
  it('should return the expected categories', function () {
    angular.mock.module('products');

    var service;

    // Get the service from the injector
    angular.mock.inject(function GetDependencies(CategoryService) {
      service = CategoryService;
    });

    // call the function on our service instance
    var categories = service.getCategories();

    expect(categories).toEqual({ 1: 'Beverages', 2: 'Condiments' });
  });
});

describe('products service tests', function () {

  // Note that we can move the call to module in the beforeEach block,
  // thus making it available for each test, keeping our tests DRY.
  beforeEach(angular.mock.module('products'));

  it('should append category names to products', function () {
    var service;

    // Get the service from the injector
    angular.mock.inject(function GetDependencies(ProductsService) {
      service = ProductsService;
    });

    var products = service.getProducts();
    expect(products[0].categoryName).toBe('Beverages');
    expect(products[1].categoryName).toBe('Condiments');
  });

  it('should append category names to products', function () {

    // Note that this version of the CategoryService overrides the version we added to the products module.
    angular.mock.module({
      'CategoryService': {
        getCategories: function() {
          return { 1: 'Electronics', 2: 'DVDs' };
        }
      }
    });

    var service;

    angular.mock.inject(function GetDependencies(ProductsService) {
      service = ProductsService;
    });

    var products = service.getProducts();
    expect(products[0].categoryName).toBe('Electronics');
    expect(products[1].categoryName).toBe('DVDs');
  });
  
});