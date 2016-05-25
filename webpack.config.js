var path = require('path');

// This file configures Webpack. This takes all our code in its separate files,
// runs it through special processors, and turns it into a single file we can
// serve up easily. This makes browsers load it faster because it only requires
// a single HTTP request to download it, rather than one for each separate
// file!
module.exports = {
  entry: path.join(__dirname, '/src/scripts/index.js'),

  // When we attempt to resolve a module, look for it in the following
  // directories, falling back to `node_modules` if we can't find it in our own
  // code.
  resolve: {
    root: path.join(__dirname, '/src/scripts'),
    fallback: path.join(__dirname, '/node_modules')
  },

  output: {
    path: __dirname,
    filename: 'build/bundle.js'
  },

  // Configre SCSS.
  sassLoader: {
    outFile: 'build/index.css',
    sourceMap: true,
    sourceMapEmbed: true
  },

  // Generate source maps to aide debugging.
  devtool: 'source-map',

  module: {
    loaders: [
      {
        // Match any files that end with `.js` or `.jsx`.
        test: /\.jsx?$/i,

        // The loader we're configuring. This one acts as a "parent" for most of
        // the stuff we want to do!
        loader: 'babel',

        // We never want to accidentally include anything from here.
        exclude: /node_modules/,

        query: {
          // Babel presets. See https://babeljs.io/docs/plugins/ for more
          // information about plugins and presets.
          presets: [
            'es2015',
            'react'
          ],

          plugins: [
            // This polyfills all the fancy things we might need, like `Map` or
            // `Promise`.
            'transform-runtime'
          ]
        }
      },

      // When we load our SASS files, compile them to CSS.
      {
        test: /\.scss$/i,
        loaders: [
          'style',
          'css',
          'sass'
        ],
      }
    ]
  }
};
