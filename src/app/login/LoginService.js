(function () {
  'use strict';

  angular.module('app').factory('LoginService', function ($http) {
    return {
      authenticate: function (logingUser) {
        return $http({
          method: "POST",
          url: "http://localhost:5000/api/login",
          data: logingUser
        });
      },

      getLoggedInUser: function (id) {
        return $http({
          method: "GET",
          url: "http://localhost:5000/api/getLoggedInUser/" + id
        });
      }


    };

  });

})();
