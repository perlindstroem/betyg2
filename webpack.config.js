const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './components/index.jsx',
  mode: 'development',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'betyg2', template: './components/index.html' }),
  ],
  devServer: {
    contentBase: './dist/',
  },
  devtool: 'inline-source-map',
};
