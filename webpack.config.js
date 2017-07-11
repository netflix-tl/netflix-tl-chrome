var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        popup: './src/popup/popup.js',
        content: './src/content/content.js',
        background: './src/background/background.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "dist")
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['es2015', {modules: false}]
                    ]
            }
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
        {
            test: /\.(scss|css)$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
         {
            test   : /\.(ttf|eot|svg|woff|woff2)$/,
            loader : 'file-loader'
        }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    devServer: {
        inline: false
    },
    plugins: [new HtmlWebpackPlugin({
        name: 'popup',
        template: 'src/popup/popup.html',
        chunks: ['popup'],
        filename: 'popup.html'
    }), new HtmlWebpackPlugin({
        name: 'background',
        filename: 'background.html',
        chunks: ['background']
        //template: 'src/background/background.html'
    }), new CopyWebpackPlugin([
        {from: 'manifest.json', to: 'manifest.json'},
        {from: 'resources', to: 'resources'},
        {from: 'src/content/content.css', to: 'resources/content.css'}
    ])
    ]
}