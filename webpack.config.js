const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode = "development" }) => {
  return {
    plugins: [
      new HtmlWebpackPlugin({template: path.resolve(__dirname, './index.html')}),
      new webpack.HotModuleReplacementPlugin(),
    ],
    entry: ["./index.jsx"],
    // Enable sourcemaps for debugging webpack's output.
    devServer: {
      hot: true,
      open: true,
      port: 5001
    },
    mode, // You can change mode with --mode=development when running in CLI
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      filename: "scripts/[hash].js",
      // sourceMapFilename: "[hash].js.map"
    },
    devtool: "source-map"
  };
};
