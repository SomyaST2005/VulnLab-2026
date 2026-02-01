// Core Express application for VulnLab-2026

const express = require('express');
const cors = require('cors');

const app = express();

// ===============================
// Global Middleware
// ===============================

// Parse JSON bodies
app.use(express.json());

// Open CORS (intentional vulnerability)
app.use(cors());

// ===============================
// Routes
// ===============================

// Import route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const uploadRoutes = require('./routes/upload');

// Mount routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', uploadRoutes);

// ===============================
// Error Handling Middleware
// ===============================

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;