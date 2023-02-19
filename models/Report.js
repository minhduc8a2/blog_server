const mongoose = require("mongoose");

const Report = mongoose.Schema({
  visits: {
    type: Number,
  },
});

module.exports = mongoose.model("Report", Report);
