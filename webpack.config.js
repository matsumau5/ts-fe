const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.ts",
  target: "node",
  externals: [nodeExternals()],
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "babel-loader",
        use: "ts-loader",
        exclude: /node_module/
      },
      {
        test: /\.pug$/,
        use: "pug-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [new NodemonPlugin()]
  // plugins: [
  //     new HtmlWebpackPlugin({
  //         template: "./view/home.pug"
  //     })
  // ]
};
