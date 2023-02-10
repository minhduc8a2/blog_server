const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxLength: 50,
    minLength: 1,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    maxLength: 50,
    match:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    maxLength: 50,
    minLength: 6,
  },
  role: {
    type: String,
    required: [true, "Please provide role"],
    default: "guest",
    maxLength: 50,
    minLength: 1,
  },
});

module.exports = mongoose.model("User", UserSchema);
