(function () {
  'use strict';

  angular.module('app').factory('BookService', function ($http) {
    return {
      getBookById: function(id){
        return $http({
          method: "GET",
          url: "http://localhost:5000/api/books/" + id
        });
      },

      editBook: function(book){
        return $http({
          method: "PUT",
          url: "http://localhost:5000/api/books/" + book.id,
          data: book
        });
      }

    };
  });

})();
