var path = require("path")
var nodeExternals = require('webpack-node-externals');

var APP_DIR = path.resolve(__dirname, 'app/js');
var SRC_DIR = path.resolve(__dirname, 'src/js');

module.exports = {
  entry: SRC_DIR + '/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: APP_DIR,
    filename: 'index.min.js'
  },
  node: {
    __dirname: false
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        exclude : /node_modules/,
        loader : 'babel',
        query: {
            presets: ['es2015', 'react']
        }
      }
    ]
  }
};