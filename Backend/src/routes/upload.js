// File upload routes for VulnLab-2026
// Vulnerabilities:
// 1. Unrestricted File Upload (CWE-434)
// 2. Path Traversal (CWE-22)

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// ===============================
// Multer Configuration (Insecure)
// ===============================
const upload = multer({
  dest: 'uploads/'   // ❌ No validation, no filtering
});

// ===============================
// UPLOAD FILE
// ===============================
router.post('/upload', authMiddleware, upload.single('file'), (req, res) => {
  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    originalName: req.file.originalname
  });
});

// ===============================
// READ FILE (Path Traversal)
// ===============================
router.get('/files', authMiddleware, (req, res, next) => {
  const fileName = req.query.name;

  // ❌ Directly trusting user input
  const filePath = path.join(__dirname, '../../uploads/', fileName);

  fs.readFile(filePath, (err, data) => {
    if (err) return next(err);

    res.send(data);
  });
});

module.exports = router;