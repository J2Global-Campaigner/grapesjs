var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var name = 'grapesjs-preset-newsletter';
var plugins = [];

module.exports = env => {


if(env.production){
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }));
  plugins.push(new webpack.BannerPlugin(pkg.name + ' - ' + pkg.version));
}

const output = {
  filename: './dist/js/' + name + '.min.js',
  library: name,
  libraryTarget: 'umd',
};

if (env.development) 
  output.filename ='./dist/js/' + name + '.js';

return {
  entry: './src',
  output: output,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: /src/,
      exclude: /node_modules/
    }],
  },
  plugins: plugins
}
  
};
