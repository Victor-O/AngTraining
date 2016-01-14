(function () {
  'use strict';

  angular.module('app').directive('selectedBook', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/book/selectedBook.html',
      scope: {
        book: "="
      },
      link: function (scope, element) {
        scope.$watch('book', function (newValue, oldValue) {
          console.log(newValue);
        }, false);
      }

    };

  });

})();
