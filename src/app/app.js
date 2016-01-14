(function () {
  'use strict';

  var myApp = angular.module('app', ['ngMaterial', 'ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      console.log('config');
      $stateProvider
        .state('library',{
          url: '/library',
          templateUrl: 'app/library/library.html',
          controller: 'LibraryController'
        })
        .state('book',{
          url: '/book/:id',
          templateUrl: 'app/book/book.html',
          controller: 'BookController'
        });
      $urlRouterProvider.otherwise('/library');
    }]);

})();
