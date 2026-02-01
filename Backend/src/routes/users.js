// User routes for VulnLab-2026
// Vulnerabilities:
// 1. Broken Object Level Authorization (CWE-284)
// 2. Sensitive Data Exposure (CWE-200)

const express = require('express');
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// ===============================
// GET USER BY ID (BOLA)
// ===============================
router.get('/users/:id', authMiddleware, (req, res, next) => {
  const userId = req.params.id;

  // ❌ No ownership check (BOLA)
  const query = `
    SELECT * FROM users WHERE id='${userId}'
  `;

  db.query(query, (err, results) => {
    if (err) return next(err);

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ❌ Exposing sensitive fields
    res.json(results[0]);
  });
});

// ===============================
// GET LOGGED-IN USER PROFILE
// ===============================
router.get('/profile', authMiddleware, (req, res, next) => {
  const userId = req.user.id;

  const query = `
    SELECT * FROM users WHERE id='${userId}'
  `;

  db.query(query, (err, results) => {
    if (err) return next(err);

    res.json(results[0]);
  });
});

module.exports = router;