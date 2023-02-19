const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  post_id: {
    type: String,
  },
  content: {
    type: String,
    required: [true, "Please provide content"],
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxLength: 100,
  },
  email: {
    type: String,
    required: [true, "Please provide name"],
    maxLength: 100,
  },
  avatar: {
    type: String,
    default: "",
    maxLength: 1000,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
