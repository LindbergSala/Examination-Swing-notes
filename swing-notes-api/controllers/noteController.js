const Note = require('../models/Note');

exports.createNote = async (req, res, next) => {
  try {
    const { title, text } = req.body;

    if (!title || !text) {
      return next({ status: 400, message: 'Title and text are required' });
    }

    const note = await Note.create({
      title,
      text,
      userId: req.userId
    });

    res.status(200).json(note);
  } catch (err) {
    next({ status: 400, message: 'Failed to create note' });
  }
};


exports.getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.status(200).json(notes);
  } catch (err) {
    next({ status: 500, message: 'Failed to fetch notes' });
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const { title, text } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, text, modifiedAt: Date.now() },
      { new: true }
    );

    if (!note) return next({ status: 404, message: 'Note not found' });

    res.status(200).json(note);
  } catch (err) {
    next({ status: 400, message: 'Failed to update note' });
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!note) return next({ status: 404, message: 'Note not found' });

    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    next({ status: 500, message: 'Failed to delete note' });
  }
};

exports.searchNotes = async (req, res, next) => {
  try {
    const { title } = req.query;

    if (!title) return next({ status: 400, message: 'Search query "title" is required' });

    const notes = await Note.find({
      userId: req.userId,
      title: { $regex: title, $options: 'i' }
    });

    res.status(200).json(notes);
  } catch (err) {
    next({ status: 500, message: 'Failed to search notes' });
  }
};
