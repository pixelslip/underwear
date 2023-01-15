const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlPages = "index about product".split(' ')

let multipleHtmlPlugins = htmlPages.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`,
    filename: `${name}.html`,
  })
})

// fs.readdir('./src/', (err, files) => {
//   let htmlPages = files.filter(file => file.match(RegExp(/.html$/)));
// });

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
    new HtmlWebpackPlugin({
      template: `./src/index.html`,
    })
  ].concat(multipleHtmlPlugins),

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
        type: 'asset/resource'
      },
      // {
      //   test: /\.(glsl|frag|vert)$/,
      //   loader: ['raw-loader', 'glslify-loader'],
      //   exclude: /node_modules/
      // }
    ]
  }
}
