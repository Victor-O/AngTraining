(function () {

  'use strict';

  angular.module('app').factory('LibraryService', function ($http) {
    return {
      getBooks: function(){
        return $http({
          method: "GET",
          url: "http://localhost:5000/api/books"
        });
      },

    };
  });

})();
