/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var gulp = require('gulp');
var wrench = require('wrench');


/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('hello-world', function(){
  console.log('Hello world!');
});

gulp.task('vet', function(){
  return gulp
    .src(config.alljs)
//    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {verbose: true}));
});

////////////////////////////////////

/*function startBrowserSync(){
  if(browserSync.active){
    return;
  }

  log('Starting browser-sync.');

  var options = {
    proxy: 'localhost:' + port,
    port: 3002,
    files: [config.app + '**!/!*.*'],
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 0
  }

  browserSync(options);


}

function log(msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}*/

