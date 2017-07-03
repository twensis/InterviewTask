var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        //  'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
        //npm install webpack-dev-server --save-devnew webpack.NoErrorsPlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        port: 3000
    },
    module: {
        loaders: [
            {
                loaders: ['babel-loader'],
                include: [
                    path.resolve(__dirname, "src"),
                ],
                test: /\.js$/

            },
            {
                loader: "style-loader!css-loader!less-loader",
                test: /\.less$/
            }
        ]
    }
}