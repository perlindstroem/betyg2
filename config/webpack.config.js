const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const outputPath = path.join(__dirname, '../dist');
const templatePath = path.join(__dirname, '../components/index.html');

module.exports = (env, argv) => ({
  entry: ['babel-polyfill', './components/index.jsx'],
  mode: env.production ? 'production' : 'development',
  output: {
    path: outputPath,
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
    new HtmlWebpackPlugin({ template: templatePath }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 3000,
    contentBase: outputPath,
    hot: true,
    proxy: {
      '/api': 'http://localhost:8080/',
    },
  },
  devtool: env.production ? '' : 'inline-source-map',
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
});
