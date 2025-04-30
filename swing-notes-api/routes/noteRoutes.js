const express = require('express');
const router = express.Router();
const { createNote, getNotes, updateNote, deleteNote, searchNotes } = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Hantering av användarens anteckningar
 */

// Skydda alla routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Skapa en ny anteckning
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, text]
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Anteckning skapad
 */
router.post('/', createNote);

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Hämta alla anteckningar för användaren
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: En lista av anteckningar
 */
router.get('/', getNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Uppdatera en anteckning
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID för anteckningen
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Anteckning uppdaterad
 */
router.put('/:id', updateNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Ta bort en anteckning
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID för anteckningen
 *     responses:
 *       200:
 *         description: Anteckning borttagen
 */
router.delete('/:id', deleteNote);

/**
 * @swagger
 * /api/notes/search:
 *   get:
 *     summary: Sök anteckningar via titel
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: title
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Text att söka efter i titeln
 *     responses:
 *       200:
 *         description: Lista med matchande anteckningar
 */
router.get('/search', searchNotes);

module.exports = router;
