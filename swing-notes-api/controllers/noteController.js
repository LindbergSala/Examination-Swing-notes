const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  try {
    const { title, text } = req.body;
    const note = await Note.create({
      title,
      text,
      userId: req.userId
    });
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create note' });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, text } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, text, modifiedAt: Date.now() },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update note' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
};

exports.searchNotes = async (req, res) => {
  try {
    const { title } = req.query;
    const notes = await Note.find({
      userId: req.userId,
      title: { $regex: title, $options: 'i' }
    });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search notes' });
  }
};
