const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Hantering av användare och autentisering
 */

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Skapa ett nytt användarkonto
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Användare skapad
 *       400:
 *         description: Fel i data eller användaren finns redan
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Logga in och få en JWT-token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token returnerad vid lyckad inloggning
 *       400:
 *         description: Felaktiga inloggningsuppgifter
 */
router.post('/login', login);

module.exports = router;
