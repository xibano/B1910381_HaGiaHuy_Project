const mongoose = require("mongoose");

const noteOfBoardSchema = new mongoose.Schema({
  title: String,
  content: String,
  favorite: Boolean,
  updatedAt: Date,
  account_id: String,
});

module.exports = mongoose.model("Note_Of_Board", noteOfBoardSchema);
