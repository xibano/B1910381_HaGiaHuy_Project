const NoteOfSchedule = require("./../models/NoteOfSchedule");

async function getNotes(req, res) {
  var notes = await NoteOfSchedule.find({ account_id: req.account_id });
  return res.status(200).json(notes);
}

function createEmptyNotesAtATime(req, res) {
  var note = new NoteOfSchedule({
    time: "",
    notes: [
      { day: "Thứ 2", content: "" },
      { day: "Thứ 3", content: "" },
      { day: "Thứ 4", content: "" },
      { day: "Thứ 5", content: "" },
      { day: "Thứ 6", content: "" },
      { day: "Thứ 7", content: "" },
      { day: "Chủ nhật", content: "" },
    ],
    account_id: req.account_id,
  });

  note.save();

  return res.status(200).json("Create successfully!");
}

async function updateTimeById(req, res) {
  var timeId = req.params.timeId;
  var newTime = req.body.newTime;

  await NoteOfSchedule.updateOne(
    { _id: timeId, account_id: req.account_id },
    { $set: { time: newTime } }
  );

  res.status(200).json("Update successfully!");
}

async function updateById(req, res) {
  var timeId = req.params.timeId;
  var noteId = req.params.noteId;
  var content = req.body.content;

  await NoteOfSchedule.updateOne(
    { _id: timeId, account_id: req.account_id, "notes._id": noteId },
    { $set: { "notes.$.content": content } }
  );

  res.status(200).json("Update successfully!");
}

async function deleteById(req, res) {
  var timeId = req.params.timeId;
  var noteId = req.params.noteId;

  await NoteOfSchedule.updateOne(
    { _id: timeId, account_id: req.account_id, "notes._id": noteId },
    { $set: { "notes.$.content": "" } }
  );

  res.status(200).json("Delete successfully!");
}

async function deleteNotesAtATimeById(req, res) {
  var timeId = req.params.timeId;

  await NoteOfSchedule.deleteOne({ _id: timeId, account_id: req.account_id });

  res.status(200).json("Delete successfully!");
}

async function deleteAllNotesAtATimeByAccount(req, res) {
  await NoteOfSchedule.deleteMany({ account_id: req.account_id });

  res.status(200).json("Delete successfully!");
}

module.exports = {
  getNotes,
  createEmptyNotesAtATime,
  updateTimeById,
  updateById,
  deleteById,
  deleteNotesAtATimeById,
  deleteAllNotesAtATimeByAccount,
};
