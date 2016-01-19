(function () {
  'use strict';

  angular.module('app').factory('AuthenticationService', function() {
    var auth = {
      isLogged: false
    }

    return auth;
  });

})();
