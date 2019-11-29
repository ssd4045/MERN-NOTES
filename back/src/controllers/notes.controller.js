const notesCtrl = {};

const Note = require("../models/Note");

notesCtrl.getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

notesCtrl.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
};

notesCtrl.createNote = async (req, res) => {
  const newnote = new Note(req.body);
  await Note.create(newnote);
  res.json(newnote);
};

notesCtrl.updateNote = async (req, res) => {
  const newdata = req.body;
  await Note.findByIdAndUpdate(req.params.id, newdata);
  res.json({ message: "Note updated" });
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndRemove(req.params.id);
  res.json({ message: "Note deleted" });
};

module.exports = notesCtrl;
