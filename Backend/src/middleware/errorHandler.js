// Global error handler for VulnLab-2026
// Intentional vulnerability: Verbose error disclosure (CWE-209)

module.exports = (err, req, res, next) => {
  console.error('ERROR:', err);

  res.status(500).json({
    message: err.message,
    stack: err.stack,          // ❌ exposes stack trace
    name: err.name
  });
};