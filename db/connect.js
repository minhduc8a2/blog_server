const mongoose = require("mongoose");

const connectDB = async (url) => {
  mongoose.connect(url, () => {
    console.log("Connected to Database");
  });
};

module.exports = connectDB;
