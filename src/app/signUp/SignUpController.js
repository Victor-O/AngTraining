(function () {

  'use strict';

  angular.module('app').controller('SignUpController', function SignUpController($scope, $mdDialog, SignUpService, $stateParams) {


    $scope.registerDialog = function ($event) {
      console.log('look maa i can fly');
      var parentE2 = angular.element(document.body);
      $mdDialog.show({
        parent: parentE2,
        targetEvent: $event,
        template: '<md-dialog aria-label="List dialog">' +
        '<md-dialog-content>' +
        '<div class="text-center"><h3>Create a new user</h3></div>' +
        '<br>' +
        '<form ng-submit="saveUser()" name="newUserForm" class="text-center" novalidate>' +

        '<md-input-container>' +
        '<label>Email</label>' +
        '<input type="text" ng-model="email" name="email" required>' +
        '<div ng-messages="newUserForm.email.$error">' +
        '<div ng-message="required">This is required.</div>' +
        '</div>' +
        '</md-input-container>' +
        '<br>' +

        '<md-input-container>' +
        '<label>Password</label>' +
        '<input type="password" ng-model="password" name="password" required>' +
        '<div ng-messages="newUserForm.password.$error">' +
        '<div ng-message="required">This is required.</div>' +
        '</div>' +
        '</md-input-container>' +
        '<br>' +

        '<md-input-container>' +
        '<label>First Name</label>' +
        '<input type="text" ng-model="firstName" name="firstName" required>' +
        '<div ng-messages="newUserForm.firstName.$error">' +
        '<div ng-message="required">This is required.</div>' +
        '</div>' +
        '</md-input-container>' +
        '<br>' +

        '<md-input-container>' +
        '<label>Last Name</label>' +
        '<input type="text" ng-model="lastName" name="lastName" required>' +
        '<div ng-messages="newUserForm.lastName.$error">' +
        '<div ng-message="required">This is required.</div>' +
        '</div>' +
        '</md-input-container>' +
        '<br>' +


        '</md-dialog-content>' +
        '<md-dialog-actions>' +
        '<md-button  type="submit" ng-disabled="newUserForm.$invalid" class="md-primary">' +
        'Save User' +
        '</md-button>' +
        '</form>' +

        '<md-button ng-click="closeDialog()" class="md-primary">' +
        'Close Dialog' +
        '</md-button>' +
        '</md-dialog-actions>' +
        '</md-dialog>',
        locals: {
          email: $scope.email,
          password: $scope.password,
          firstName: $scope.firstName,
          lastName: $scope.lastName
        },
        controller: RegisterController
      });

      function RegisterController($scope, $mdDialog, SignUpService) {

        $scope.email = null;
        $scope.password = null;
        $scope.firstName = null;
        $scope.lastName = null;

        $scope.saveUser = function () {
          var newUser = {
            email: $scope.email,
            password: $scope.password,
            firstName: $scope.firstName,
            lastName: $scope.lastName
          };

          SignUpService.registerUser(newUser);
          $mdDialog.hide();
        };

        $scope.closeDialog = function () {
          $mdDialog.hide();
        };
      }
    };
  });


})();
