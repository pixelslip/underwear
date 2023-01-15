const path = require('path')
const webpack = require('webpack')
const fs = require('fs')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlPages = []
let files = fs.readdirSync('src')

files.forEach(file => {
  if(file.match(/\.html$/)) {
    htmlPages.push(
      new HtmlWebpackPlugin({
        template: `./src/${file}`,
        filename: `${file}`,
      })
    )
  }
})

module.exports = {
  entry: [
    path.join(__dirname, 'src/js/app.js'),
    path.join(__dirname, 'src/styles/index.scss')
  ],

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    ...htmlPages
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        type: 'asset'
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      }
    ]
  }
}
