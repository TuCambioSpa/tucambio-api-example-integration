const CryptoJS = require('crypto-js');

// Function to generate HMAC SHA256 signature
function generateHmacSha256Signature(payload) {
  const secretKey = process.env.TUCAMBIO_SECRET_KEY || 'x';
  return CryptoJS.HmacSHA256(payload, secretKey).toString();
}

module.exports = { generateHmacSha256Signature };
