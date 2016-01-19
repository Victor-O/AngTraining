(function () {
  'use strict';

  angular.module('app').factory('TokenInterceptor', function ($q, $localStorage, $location, AuthenticationService) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if (!_.isEmpty($localStorage.token)) {
          console.log('token: request');
          config.headers.Authorization = 'Bearer ' + $localStorage.token;
        }
        return config;
      },

      requestError: function(rejection) {
        return $q.reject(rejection);
      },

      /* Set Authentication.isAuthenticated to true if 200 received */
      response: function (response) {
        if (response != null && response.status == 200 && $localStorage.token && !AuthenticationService.isAuthenticated) {
          AuthenticationService.isAuthenticated = true;
        }
        return response || $q.when(response);
      },

      /* Revoke client authentication if 401 is received */
      responseError: function(rejection) {
        if (rejection != null && rejection.status === 401 && ($localStorage.token || AuthenticationService.isAuthenticated)) {
          console.log("is it this i'm looking for?");
          delete $localStorage.token;
          AuthenticationService.isAuthenticated = false;
          $location.path("/login");
        }

        return $q.reject(rejection);
      }
    };
  });


})();
