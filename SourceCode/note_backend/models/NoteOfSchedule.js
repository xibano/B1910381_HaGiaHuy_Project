const mongoose = require("mongoose");

const noteOfScheduleSchema = new mongoose.Schema({
  time: String,
  notes: [{ day: String, content: String }],
  account_id: String,
});

module.exports = mongoose.model("Note_Of_Schedule", noteOfScheduleSchema);
