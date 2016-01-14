(function () {
  'use strict';

  angular.module('app').controller('BookController', function BookController($scope, BookService, $stateParams) {
    $scope.vm = {};
    $scope.books = [];
    $scope.book = {};

    BookService.getBookById($stateParams.id)
      .then(function (res) {
        $scope.book = res.data;
      });

    $scope.btn_add = function (book) {
      var id = 1;

      if (book.reviews.length > 0) {
        var lastId = book.reviews[book.reviews.length - 1].id;
        id = lastId + 1;
      }

      if ($scope.txtComment !== '') {
        $scope.review = {
          id: id,
          text: $scope.txtComment,
          votes: 0
        };

        book.reviews.push($scope.review);
        BookService.editBook(book);
        $scope.txtComment = "";
      }
    };

    $scope.remItem = function ($index, book) {
      book.reviews.splice($index, 1);
      BookService.editBook(book);
    };

    $scope.upVote = function (book, review) {
      var toBeUpdated = _.findIndex(book.reviews, {'id': review.id});
      if (toBeUpdated !== -1) {
        review.votes++;
      }
      BookService.editBook(book);
    };

    $scope.downVote = function (book, review) {
      var toBeUpdated = _.findIndex(book.reviews, {'id': review.id});
      if (toBeUpdated !== -1) {
        review.votes--;
      }
      BookService.editBook(book);
    };

    $scope.bookRead = function (book) {
      book.alreadyRead = !book.alreadyRead;
      BookService.editBook(book)
        .then(function (response) {
          getAllBooks();
        }, function (res) {
          console.log(res);
        });
    };


  });

})();


