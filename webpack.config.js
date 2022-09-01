const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

module.exports = {
    entry: './src/index.js',
    output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    },
    module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            }
        },
        {
        test :  /\.css$/,
        use:[
            'style-loader',
          'css-loader'
        ]
        },
        {test:/\.(jpg|png)$/, 
        use: {loader:'url-loader'}
    }
    ]
    },
    plugins : [htmlPlugin]
};
