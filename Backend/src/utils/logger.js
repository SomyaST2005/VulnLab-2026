// Simple logger utility for VulnLab-2026
// Vulnerability: Sensitive Data Exposure via Logs (CWE-532)

module.exports = (req) => {
  console.log('----- REQUEST LOG -----');
  console.log('URL:', req.originalUrl);
  console.log('Method:', req.method);

  // ❌ Logging full headers (includes Authorization token)
  console.log('Headers:', req.headers);

  // ❌ Logging request body (may contain passwords)
  console.log('Body:', req.body);

  console.log('-----------------------');
};
