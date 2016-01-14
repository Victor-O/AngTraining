module.exports = function () {
  var app = './src/';
  var appjs = app + 'app/';
  var temp = './.tmp/';
  var server = './src/server';

  var config = {

    /**
     * File paths
     */
    app: app,
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    css: temp + 'styles.css',
    index: app + 'index.html',
    js: [
      appjs + '**/app.js',
      appjs + '**/*.js'
    ],
    sass: app + 'app/css/styles.scss',
    server: server,
    temp: temp,


    templateCache: {
      file: 'templates.js',
      options: {
        module: 'app.core',
        standAlone: false,
        root: 'app/'
      }
    },

    browserReloadDelay: 1000,

    /**
     * Bower and NPM locations
     */
    bower: {
      json: require('./bower.json'),
      directory: './bower_components/',
      ignorePath: '../..'
    },
    packages: [
      './package.json',
      './bower.json'
    ],

    /**
     * Node settings
     */
    defaultPort: 7203,
    nodeServer: './src/server/app.js'

  };

  config.getWiredepDefaultOptions = function () {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  return config;
};
