const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/js/script.js",
  output : {
    filename: "js/script.js",
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(scss)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader:MiniCssExtractPlugin.loader,
            options : {
              publicPath:'',
            }
          },
          {
            loader: 'css-loader',
            options: {
              url:false,
            }
          },
          "sass-loader",
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),    
    new HtmlWebpackPlugin({
      template: "./src/pages/index.ejs",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/o-nas.ejs",
      filename: "o-nas/index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/oferta.ejs",
      filename: "oferta/index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/kariera.ejs",
      filename: "kariera/index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/kontakt.ejs",
      filename: "kontakt/index.html"
    }),
  ],
  devServer: {
    port:1234,
    /* contentBase: './public',
    publicPath: '/',
    writeToDisk: true,
    watchContentBase: true, */
  }
}