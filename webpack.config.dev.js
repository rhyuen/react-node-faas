const base = require("./webpack.config.base.js");
const merge = require("webpack-merge");
const path = require("path");

module.exports = merge(base, {
    mode: "development",
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000
    }
});