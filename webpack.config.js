const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const webpack = require('webpack');
const fs = require('fs');
const name = pkg.name;

let plugins = [];

module.exports = env => {  
  console.log(env);
  if (env.production) {
    plugins = [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.UglifyJsPlugin({include: /\.min\.js$/, minimize:true, compressor: {warnings:false}}),
      new webpack.BannerPlugin(`${name} - ${pkg.version}`),
    ];
  } else if (env.development) {
    //output.filename = './dist/js/grapes.js';
  } else {
    const index = 'index.html';
    const indexDev = `_${index}`;
    const template = fs.existsSync(indexDev) ? indexDev : index;
    plugins.push(new HtmlWebpackPlugin({ template, inject: false }));
  }

  plugins.push(new webpack.ProvidePlugin({
    _: 'underscore',
    Backbone: 'backbone'
  }));

  return {
    entry: {
      'grapes' : './src',
      'grapes.min': './src',
    },
    output: {
      path: __dirname + "/dist",
      filename: "[name].js",
      library: name,
      libraryTarget: 'umd',
    },
    plugins: plugins,
    module: {
      loaders: [{
        test: /\/index\.js$/,
        loader: 'string-replace-loader',
        // query: {
        //   search: '<# VERSION #>',
        //   replace: pkg.version
        // }
      },{
        test: /\.js$/,
        loader: 'babel-loader',
        include: /src/
      }],
    },
    resolve: {
      modules: ['src', 'node_modules'],
      alias: {
        jquery: 'cash-dom'
      }
    }
  };
}
