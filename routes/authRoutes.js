// routes/authRoutes.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const { register, login, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/register', [
  check('username').not().isEmpty().withMessage('Username is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('role').isIn(['user', 'admin']).withMessage('Role must be either user or admin')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, register);

router.post('/login', [
  check('username').not().isEmpty().withMessage('Username is required'),
  check('password').not().isEmpty().withMessage('Password is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, login);

router.post('/logout', logout);

module.exports = router;
