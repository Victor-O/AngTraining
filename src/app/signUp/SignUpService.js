(function () {

  'use strict';

  angular.module('app').factory('SignUpService', function ($http) {
    return {
      registerUser: function (newUser) {
        return $http({
          method: "POST",
          url: 'http://localhost:5000/api/registerUser',
          data: newUser
        });

      }
    };
  });

})();
