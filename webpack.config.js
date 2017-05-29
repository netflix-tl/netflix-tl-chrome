var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
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
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                {loader: 'style-loader/url?sourceMaps'},
                {loader: 'file-loader'}
            ]
        }
        ]
    },
    resolve: {
        extensions: ['js']
    },
    devServer: {
        inline: false
    },
    plugins: [new HtmlWebpackPlugin({
        name: 'timely-app',
        template: 'src/popup/popup.html',
        filename: 'popup.html'
    }), new HtmlWebpackPlugin({
        name: 'background',
        filename: 'background.html',
        template: 'src/background/background.html'
    }), new HtmlWebpackPlugin({
        name: 'dev-app',
        filename: 'index.html',
        template: 'src/popup/popup.html'
    }), new CopyWebpackPlugin([
        {from: 'manifest.json', to: 'manifest.json'},
        {from: 'resources', to: 'resources'}
    ])


    ]
    // plugins: [new CopyWebpackPlugin([
    //     {from: 'src/popup.html'},
    //     {from: 'src/background.html'},
    //     {from: 'src/popup.css'},
    //     {from: 'resources', to: 'resources'}
    // ]
    // )]
}