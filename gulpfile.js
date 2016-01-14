/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';


var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;
var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function (file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
  require('./gulp/' + file);
});

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('hello-world', function () {
  console.log('Hello world!');
});

gulp.task('vet', function () {
  return gulp
    .src(config.alljs)
    //    .pipe(jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
});

gulp.task('styles', ['clean-styles'], function () {
  log('Compiling SCSS --> CSS');

  return gulp
    .src(config.sass)
    .pipe($.plumber())
    .pipe($.sass({style: 'expanded', includePaths: ['_/sass/']}))
    //    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function () {
  var files = config.temp + '**/*.css';
  clean(files);
});

gulp.task('sass-watcher', function () {
  gulp.watch([config.sass], ['styles']);
});

gulp.task('wiredep', function () {
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;

  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest(config.app));
});

gulp.task('inject', ['wiredep', 'styles'], function () {

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.css)))
    .pipe(gulp.dest(config.app));
});

gulp.task('serve-dev', ['inject'], function () {
  var isDev = true;
  var nodeOptions = {
    script: config.nodeServer,
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV': isDev ? 'dev' : 'build'
    },
    watch: [config.server]
  };

  return $.nodemon(nodeOptions)
    .on('restart', function (ev) {
      log('*** nodemon restarted');
      log('files changed on restart:\n' + ev);
      setTimeout(function () {
        browserSync.notify('reloading now ...');
        browserSync.reload({stream: false});
      }, config.browserReloadDelay);
    })
    .on('start', function () {
      log('*** nodemon started');
      startBrowserSync(isDev);
    })
    .on('crash', function () {
      log('*** nodemon crashed: script crashed for some reason');
    })
    .on('exit', function () {
      log('*** nodemon exited cleanly');
    });
});

////////////////////////////////////

function changeEvent(event) {
  var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
  log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync() {
  if (browserSync.active) {
    return;
  }

  log('Starting browser-sync.');

    gulp.watch([config.sass], ['styles'])
      .on('change', function(event){ changeEvent(event); });

  var options = {
    proxy: 'localhost:' + port,
    port: 3000,
    files: [
      config.app + '**/*.*',
      '!' + config.sass,
      config.temp + '**/*.css'
    ],
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

function clean(path) {
  log('Cleaning ' + $.util.colors.blue(path));
  del(path);
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
}

