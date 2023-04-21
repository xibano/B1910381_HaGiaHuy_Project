const NoteOfDate = require("./../models/NoteOfDate");

async function findByDate(req, res) {
  var note = await NoteOfDate.findOne({
    date: Number(req.params.date),
    month: Number(req.params.month),
    year: Number(req.params.year),
    account_id: req.account_id,
  });

  res.json(
    note ?? {
      id: null,
    }
  );
}

async function createByDate(req, res) {
  var note = new NoteOfDate({
    date: req.body.date,
    month: req.body.month,
    year: req.body.year,
    content: req.body.content,
    account_id: req.account_id,
  });

  note.save();

  res.json("Note is created");
}

async function updateById(req, res) {
  await NoteOfDate.updateOne(
    { _id: req.params.id },
    { $set: { content: req.body.content } }
  );

  res.json("Note is updated");
}

async function deleteById(req, res) {
  await NoteOfDate.deleteOne({ _id: req.params.id });

  res.json("Note is deleted");
}

module.exports = { findByDate, createByDate, updateById, deleteById };
