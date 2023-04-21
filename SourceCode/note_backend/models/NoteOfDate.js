const mongoose = require("mongoose");

const noteOfDateSchema = new mongoose.Schema({
  date: Number,
  month: Number,
  year: Number,
  content: String,
  account_id: String,
});

module.exports = mongoose.model("Note_Of_Date", noteOfDateSchema);
