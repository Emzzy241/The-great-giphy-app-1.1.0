const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// because all the above are plugins we need to first require it and then add it to the plugins array in webpack.config.js


module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',  
  devServer: {                 
    static: './dist'      
  },
   plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      context: "compiler.context",
      eslintPath: "eslint",
      extensions: 'js',
      exclude: 'node_modules',
      fix: false,
      formatter: 'stylish',
      lintDirtyModulesOnly: false,
      threads: false,
      emitError: true,
      emitWarning: true,
      failOnError: true,
      failOnWarning: false,
      quiet: false,
      outputReport: false
    }),
    new HtmlWebpackPlugin({
      title: 'Great Giphy App',
      template: './src/index.html',
      inject: 'body'
    }),
    // adding the .env plugin to the plugins array
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};