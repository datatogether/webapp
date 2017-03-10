'use strict';

var path = require('path');
var webpack = require('webpack');

var ENV = {
 "process.env.REACT_SYNTAX_HIGHLIGHTER_LIGHT_BUILD": true,
  __BUILD__ : {
    PRODUCTION : JSON.stringify(true),
    DEVELOP : JSON.stringify(false),
    STAGING : JSON.stringify(false),

    BASE_URL : JSON.stringify("http://house-of-knowledge.herokuapp.com"),
    WEBSOCKET_URL : JSON.stringify("house-of-knowledge.herokuapp.com/ws"),
    API_URL : JSON.stringify("http://house-of-knowledge.herokuapp.com"),
    STATIC_ASSETS_URL : JSON.stringify("http://house-of-knowledge.herokuapp.com"),
  }
};

function exitOneFail() {
  this.plugin("done", function(stats) {
    if (stats.compilation.errors && stats.compilation.errors.length) {
      console.log(stats.compilation.errors);
      process.exit(1);
    }
  });
}

module.exports = {
  devtool : 'cheap-module-source-map',
  entry: {
    'app' : './src/js/index.js',
    'vendor' : [ 'react', 'react-dom' ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath : "http://house-of-knowledge.herokuapp.com/js/",
    filename: '[name].min.js',
    chunkFilename: "[name].chunk.min.js"
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(ENV),
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
    exitOneFail,
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
    ]
  }
};
