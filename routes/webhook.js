const { generateHmacSha256Signature } = require('../utils/hash');

// Get list of valid currencies to send a remittance.
const webhook = async (req, res, next) => {
  const headers = req.headers;

  const authorization = headers['authorization'];
  const authorizationHash = generateHmacSha256Signature(
    JSON.stringify(req.body)
  );

  try {
    if (authorization !== authorizationHash) {
      throw new Error('Invalid hash validation');
    }
    console.log('Data from TCAPI', req.body);
  } catch (error) {
    next(error);
  }
};

module.exports = webhook;
