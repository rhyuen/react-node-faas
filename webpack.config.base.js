const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        "index": path.join(__dirname, "src/Index.jsx")
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: "babel-loader",
        }, {
            test: /\.json$/,
            use: {
                loader: "json-loader"
            }
        }, {
            test: /\.(png|jpg|gif)$/,
            use: {
                loader: "file-loader"
            }

        }]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, "src/templates/index.html"),
            favicon: path.join(__dirname, "src/images/favicon_oliabank.png"),
            filename: "index.html",
            inject: "body",
            title: "OLIA BANK"
        })
    ]
};