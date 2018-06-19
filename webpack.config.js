const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './components/index.jsx'],
  mode: 'development',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.jsx$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.html$/, exclude: /node_modules/, use: 'html-loader' },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: ['url-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './components/index.html' }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist/',
    hot: true,
  },
  devtool: 'inline-source-map',
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
