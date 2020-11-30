const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';

const cssDev = ['style-loader', 'css-loader', 'sass-loader', 'import-glob-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader', 'import-glob-loader'],
  publicPath: '../',
});


module.exports = {
  entry: './src/index.jsx',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/build.js',
    publicPath: '/',
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    inline: true,
    hot: true,
    historyApiFallback: true,
  },

  devtool: dev ? 'cheap-eval-source-map' : false,

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['node_modules', 'src'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            plugins: ['transform-react-jsx'],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: dev ? cssDev : cssProd,
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        use: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.(woff2?|ttf|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'styles/style.css',
      disable: dev,
      allChunks: true,
    }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      dev,
      prod: !dev,
    }),
  ],
};
