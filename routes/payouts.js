const express = require('express');

const { api } = require('../utils/api');
const { generateHmacSha256Signature } = require('../utils/hash');
const { makeTuCambioAPIHeaders } = require('../utils/headers');
const webhook = require('./webhook');

const router = express.Router();

// Submit payout
router.post('/', async (req, res, next) => {
  // Extract payload from request body
  const requestBody = req.body;

  const requestPayloadJSON = JSON.stringify(requestBody);
  const headers = await makeTuCambioAPIHeaders(requestPayloadJSON);

  try {
    const response = await api.post('/payouts', requestBody, { headers });
    console.log('Payment request successful!');
    res.json({
      message: 'Payment request successful',
      response: response.data,
    });
  } catch (error) {
    next(error);
  }
});

// Find a payout
router.get('/', async (req, res, next) => {
  // Extract query params
  const params = req.query;

  const timestamp = new Date().toUTCString();
  const authorizationHash = generateHmacSha256Signature(timestamp);

  const headers = {
    'X-Date': timestamp,
    Authorization: authorizationHash,
  };

  try {
    const response = await api.get('/payouts', { headers, params });
    console.log(`Get Payment: ${response.data}`);
    res.json({
      message: 'Get Payment request successful',
      response: response.data,
    });
  } catch (error) {
    next(error);
  }
});

// Webhook
router.post('/webhook', webhook);

module.exports = router;
