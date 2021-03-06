const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';

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
                use: 'babel-loader'
            },
            {

                test: /\.(sa|sc|c)ss$/,
                use: [
                    dev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff2?)$/,
                use: 'file-loader?name=fonts/[name].[ext]',
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            dev,
            prod: !dev,
        }),
    ],
};
