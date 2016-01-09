/**
 * Created by mihai vict on 08-Jan-16.
 */
'use strict';

angular.module('app').controller('BookController', function BookController($scope, bookService) {
  $scope.vm = {};
  function success(books){
    console.log(books);
    $scope.books = books;
  }
  function error(response){
    console.warn(response);
  }
  $scope.angularImg = './assets/images/angular.png';
  $scope.books = [];
  bookData.getAll()
    .then(success, error);
  $scope.selectBook = function (book) {
    $scope.vm.selectedBook = book;
  };
});


