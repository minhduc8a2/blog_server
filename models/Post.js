const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
    maxLength: 200,
  },
  content: {
    type: String,
    required: [true, "Please provide content"],
    
  },
  author: {
    type: String,
    required: [true, "Please provide author"],
    maxLength: 100,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  tag: {
    type: String,
    required: [true, "Please provide tag"],
    maxLength: 100,
  },
  image: {
    type: String,

    default:
      "https://scontent.fsgn5-5.fna.fbcdn.net/v/t31.18172-8/15493733_632661176936131_6528865178704959966_o.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=RMuqU9XWiIQAX9uR73s&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfCKkX28SFIfccLVaSHDTY3ezlUzNlmj0t3ujUngKmhDoA&oe=63FD4DF9",
  },
});

module.exports = mongoose.model("Post", PostSchema);
