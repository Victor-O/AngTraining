(function () {
  'use strict';

  angular.module('app').controller('WishlistController', function BookController($scope, $mdDialog, WishlistService, $stateParams) {

    $scope.wishlist = [];

    WishlistService.getWishlist($stateParams)
      .then(function (res) {
        $scope.wishlist = res.data;
      });

    $scope.addToWishlist = function (book) {
      WishlistService.addBook(book);
    };

    $scope.openWishlist = function ($event) {
      var parentEl = angular.element(document.body);
      debugger;
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        template: '<md-dialog aria-label="List dialog">' +
        '  <md-dialog-content>' +
        '    <md-list>' +
        '      <md-list-item ng-repeat="item in wishlist">' +
        '       <div class="row">{{item.name}} ' +
        '       de {{item.author}} ' +
        '<a style="margin-right: 15px;" href="" ng-click="remBook(item)">X</a> </div>' +
        '      ' +
        '    </md-list-item></md-list>' +
        '  </md-dialog-content>' +
        '  <md-dialog-actions>' +
        '    <md-button ng-click="closeDialog()" class="md-primary">' +
        '      Close Dialog' +
        '    </md-button>' +
        '  </md-dialog-actions>' +
        '</md-dialog>',
        locals: {
          wishlist: $scope.wishlist
        },
        controller: DialogController
      });

      function DialogController($scope, $mdDialog, WishlistService, $stateParams) {

        $scope.wishlist = [];

        WishlistService.getWishlist($stateParams)
          .then(function (res) {
            $scope.wishlist = res.data;
          });

        $scope.remBook = function(book){
          WishlistService.removeBook(book);
        };

        $scope.closeDialog = function () {
          $mdDialog.hide();
        };
      }
    };

  });

})();
