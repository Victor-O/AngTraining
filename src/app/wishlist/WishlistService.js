(function () {

  'use strict';

  angular.module('app').factory('WishlistService', function ($http) {
    return {
      getWishlist: function(){
        return $http({
          method: "GET",
          url: "http://localhost:5000/api/wishlist"
        });
      },

      addBook: function(book){
        return $http({
          method: "POST",
          url: "http://localhost:5000/api/wishlist",
          data: book
        });
      },

      removeBook: function(book){
        return $http({
          method: "DELETE",
          url: "http://localhost:5000/api/wishlist/" + book.id
        });
      }
    };
  });

})();
