const path = require("path");

module.exports = {
  entry: "./src/lib/liscap.js",
  output: {
    filename: "liscap.min.js",
    path: path.resolve(__dirname, "src/dist"),
    library: "liscap",
    libraryTarget: "var",
  },
  mode: "production",
};
