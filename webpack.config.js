const path = require("path"); //Require path package from node 

//Main javascript file 
module.exports = {
  entry: "./src/index.js", //Main javascript file that we're editing
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
};

