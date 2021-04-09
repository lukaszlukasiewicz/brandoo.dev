const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs');

const includeExp = /\<include src=\"(.+)\"\/?\>(?:\<\/include\>)?/gi;
const includeFiles = (content, loader) => {
  return content.replace(includeExp, (m, src) => { 
    const filePath = path.resolve(loader.context, src)
    loader.addDependency(filePath);
    return includeFiles(fs.readFileSync(filePath, 'utf8'),loader)
  })
}

module.exports = {
  entry: "./src/js/script.js",
  output : {
    filename: "js/script.js",
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          publicPath : '/images',
          esModule : false,
          name: '[name].[ext]'
        },
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(html)$/i,
        loader: 'html-loader',
        options : {
          esModule: false,
          preprocessor: (content, loader) => includeFiles(content, loader)
        }
      },     
      {
        test: /\.(scss)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader:MiniCssExtractPlugin.loader,
          },
          'css-loader',
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
      template: "./src/pages/index.html",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/o-nas.html",
      filename: "o-nas/index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/oferta.html",
      filename: "oferta/index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/kariera.html",
      filename: "kariera/index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/kontakt.html",
      filename: "kontakt/index.html"
    }),
  ],
  devServer: {
    port:1234,
  }
}