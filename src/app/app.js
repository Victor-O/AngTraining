(function () {
  'use strict';

  var myApp = angular.module('app', ['ngMaterial', 'ui.router', 'ngStorage', 'angular-jwt'])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
      $httpProvider.interceptors.push('TokenInterceptor');
      console.log('config');
      $stateProvider
        .state('library', {
          url: '/library',
          templateUrl: 'app/library/library.html',
          controller: 'LibraryController',
          access: { requiredLogin: true }
        })
        .state('book', {
          url: '/book/:id',
          templateUrl: 'app/book/book.html',
          controller: 'BookController',
          access: { requiredLogin: true }
        })
        .state('login', {
          url: '/login',
          templateUrl: 'app/login/login.html',
          controller: 'LoginController',
          access: { requiredLogin: false }
        });
      $urlRouterProvider.otherwise('/login');
    }]);

  angular.module('app').run(function($rootScope, $state, AuthenticationService) {
    $rootScope.$on("$stateChangeStart", function(event, nextRoute, currentRoute) {
      if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
        console.log('123');
        $state.go('login');
      }
    });
  });

})();
