const mongoose = require("mongoose");

const userAccount = new mongoose.Schema({
  username: String,
  password: String,
  fullname: String,
  avatar: String,
});

module.exports = mongoose.model("User_Account", userAccount);
