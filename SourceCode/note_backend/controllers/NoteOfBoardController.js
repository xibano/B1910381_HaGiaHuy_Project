const NoteOfBoard = require("./../models/NoteOfBoard");

async function getNotes(req, res) {
  var notes = await NoteOfBoard.find({
    account_id: req.account_id,
  });

  res.json(notes);
}

async function createNote(req, res) {
  var note = new NoteOfBoard({
    title: req.body.title,
    content: req.body.content,
    favorite: false,
    updatedAt: new Date(),
    account_id: req.account_id,
  });
  await note.save();

  res.json(note);
}

async function changeFavorite(req, res) {
  await NoteOfBoard.updateOne(
    {
      _id: req.params.id,
      account_id: req.account_id,
    },
    { $set: { favorite: req.params.favorite == "true" ? true : false } }
  );

  res.json("Update favorite successfully!");
}

async function updateById(req, res) {
  await NoteOfBoard.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
        updatedAt: new Date(),
      },
    }
  );

  res.json("Update note successfully!");
}

async function deleteById(req, res) {
  await NoteOfBoard.deleteOne({
    _id: req.params.id,
  });

  res.json("Delete successfully!");
}

module.exports = {
  getNotes,
  createNote,
  changeFavorite,
  updateById,
  deleteById,
};
