'use strict';

angular.module('app').factory('bookService', function ($http, $q) {
  return {
    getAll: function(){
      var defer = $q.defer();

      function success(response){
          defer.resolve(response.data);
      }
      function error(response){
        defer.reject(response.data);
      }

      var books = $http.get('app/data/books.json')
        .then(success, error);

      return defer.promise;
    }

  };
});
