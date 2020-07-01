const isDevelopment = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
         test: /\.module\.s(a|c)ss$/,
         loader: [
           isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
           {
             loader: 'css-loader',
             options: {
               modules: true,
               sourceMap: isDevelopment
             }
           },
           {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()]
              }
            },
           {
             loader: 'sass-loader',
             options: {
               sourceMap: isDevelopment,
             }
           }
         ]
       },
       {
         test: /\.s(a|c)ss$/,
         exclude: /\.module.(s(a|c)ss)$/,
         loader: [
           isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
           'css-loader',
           {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()]
              }
            },
           {
             loader: 'sass-loader',
             options: {
               sourceMap: isDevelopment
             }
           }
         ]
       },
       {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: !isDevelopment }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: !isDevelopment
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              //WEBP is just supported by Chrome and there is
              // a bug with image-webpack-loader when setting it to false
              // webp: {
              //   enabled: false,
              //   quality: 75
              // }
            }
          }
        ]
      },
      {
        test: /browserconfig\.xml$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "browserconfig.xml",
            },
          },
          {
            loader: "web-app-browserconfig-loader",
          },
        ],
      },
      {
        test: /\.(json|tsv|ttf|woff2|woff|eot)/,
        type: 'javascript/auto',
        use: [{loader: "file-loader"}],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.gif', '.png', '.jpg', '.jpeg', '.svg'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  output: {
    filename: isDevelopment ? '[name].js' : '[name].[hash].js'
  },
  plugins: [
     new MiniCssExtractPlugin({
       filename: isDevelopment ? '[name].css' : '[name].[hash].css',
       chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
     }),
     new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/images/favicon/favicon.ico',
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
   historyApiFallback: true,
   contentBase: './',
   hot: true
  },
}
