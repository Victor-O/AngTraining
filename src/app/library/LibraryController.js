(function () {
  'use strict';

  angular.module('app').controller('LibraryController', function LibraryController($scope, LibraryService, $stateParams){
    $scope.vm = {};
    $scope.books = [];

    var getAllBooks = function () {
      LibraryService.getBooks($stateParams)
        .then(function (res) {
          $scope.books = res.data;
        });
    };

    getAllBooks();
  });

})();
