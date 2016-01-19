(function () {
  'use strict';

  angular.module('app').directive('navbar', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/commonFiles/navbar.html',

      controller: function ($scope, LoginService, $localStorage, $state, jwtHelper) {

        var payLoad = {};
        if (!_.isEmpty($localStorage.token)) {
          payLoad = jwtHelper.decodeToken($localStorage.token);
        }
        $scope.vm.loggedUser =  payLoad;

        $scope.vm.logOut = function () {
          console.log('loggin out');
       //   LoginService.logOut();
          $localStorage.token = {};
          $scope.vm.loggedUser = {};
          $localStorage.loggedAlready = false;
          $scope.loggedAlready = false;
          $state.go('login');
        };

      }


    };

  });

})();
