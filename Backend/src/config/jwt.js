// JWT configuration for VulnLab-2026
// Intentional vulnerabilities: weak secret & loose options

module.exports = {
  secret: process.env.JWT_SECRET || 'supersecret',
  options: {
    expiresIn: '7d'   // ❌ long expiry (bad practice)
  }
};