const express = require('express');
const router = express.Router();
const { createNote, getNotes, updateNote, deleteNote, searchNotes } = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

// Skydda alla routes
router.use(authMiddleware);

// Endpoints
router.post('/', createNote);
router.get('/', getNotes);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/search', searchNotes);

module.exports = router;
