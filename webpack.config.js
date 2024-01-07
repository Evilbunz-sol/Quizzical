module.exports = {
  mode: 'production', // or 'development'
  entry: {
    "index": "./index" // Adjust this if your entry file is located elsewhere
  },
  output: {
    filename: "[name].pack.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  }
};
