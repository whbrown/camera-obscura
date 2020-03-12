const path = require("path");
import Dotenv from 'dotenv-webpack';

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: {
    main: "./src/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contentHash].bundle.js",
    chunkFilename: "[name].[contentHash].bundle.js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
       vendor: {
        test: /node_modules/,
        chunks: 'initial',
        name: 'vendor',
        enforce: true
       },
      }
    }
  },
  plugins: [
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
};