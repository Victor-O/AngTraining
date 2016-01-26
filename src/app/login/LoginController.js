(function () {
  'use strict';

  angular.module('app').controller('LoginController', function LoginController($scope, $state, $stateParams, LoginService, $localStorage, AuthenticationService) {

    $scope.vm = {};
    $scope.incorrect = false;
    $scope.loggedAlready = $localStorage.loggedAlready;

    $scope.vm.login = function () {
      var logingUser = {
        email: $scope.vm.username,
        password: $scope.vm.password
      };

      var payLoad = {};
      if (!_.isEmpty($localStorage.token)) {
        payLoad = jwtHelper.decodeToken($localStorage.token);
      }
      var loggedUser = payLoad;

      if (loggedUser == {} || loggedUser === undefined) {
        console.log("A user is logged already");
        return;

      } else {

        LoginService.authenticate(logingUser).then(function (res) {
          if (res.data === 'Incorrect email/password') {
            $scope.incorrect = true;
            return;
          }

          $localStorage.token = res.data.token;
          $localStorage.loggedAlready = true;
          $scope.loggedAlready = true;
          AuthenticationService.isLogged = true;

          $state.go('library');
        });

      }
    };


  });


})();
