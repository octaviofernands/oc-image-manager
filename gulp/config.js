var path    = require('path');
var root    = path.resolve('./');
var assets  = path.join(root, 'app/public');
var src     = path.join(root, 'assets-src');
var bower   = path.join(root, 'bower_components');

module.exports = {
  app: {
    src: src,
    root: root,
    assets: assets,
    bower: bower
  },
  fonts: {
    src: [
      path.join(bower, 'bootstrap-material-design/fonts/**/*.{ttf,eot,otf,woff,woff2,svg}'),
      path.join(bower, 'font-awesome/fonts/**/*.{ttf,eot,otf,woff,woff2,svg}')
    ],
    dest: path.resolve(assets, 'fonts'),
    ext: '.{ttf,eot,otf,woff,woff2,svg}'
  },
  styles: {
    dest: path.resolve(assets, 'css'),
    less: {
      src: [
        path.resolve(src, 'less', 'main.less')
      ]
    },
    minify: {
      keepBreaks: true
    },
    prefix: 'Last 2 versions'
  },
  scripts: {
    src: path.resolve(src, 'js'),
    dest: path.resolve(assets, 'js'),
    opts: {
      entries: [path.resolve(src, 'js', 'main.js')],
      cache: {},
      packageCache: {},
      fullPaths: false
    }
  },
  vendors: {
    src: bower,
    dest: path.resolve(assets, 'js'),
    concat: [
      'jquery/dist/jquery.js',
      'isMobile/isMobile.js',
      'typeahead.js/dist/typeahead.bundle.js',
      'bootstrap/dist/js/bootstrap.min.js',
      'bootstrap-material-design/dist/js/ripples.min.js',
      'bootstrap-material-design/dist/js/material.min.js',
      'youtube-loading-bar/dist/js/youtubeLoadingBar.min.js',
      'jquery-form/jquery.form.js',
      'cropper/dist/cropper.min.js'
    ],
    unconcat: [
      'modernizr/modernizr.js'
    ]
  },
  vendorsStyles: {
    src: bower,
    dest: path.resolve(assets, 'css'),
    concat: [
      'bootstrap/dist/css/bootstrap.min.css',
      'bootstrap-material-design/dist/css/material.min.css',
      'bootstrap-material-design/dist/css/material-fullpalette.min.css',
      'bootstrap-material-design/dist/css/ripples.min.css',
      'cropper/dist/cropper.min.css',
      'font-awesome/css/font-awesome.min.css'
    ],
    unconcat: []
  },
}