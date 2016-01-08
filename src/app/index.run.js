(function() {
  'use strict';

  angular
    .module('angTraining')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
