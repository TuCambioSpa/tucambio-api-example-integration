const express = require('express');

const { api } = require('../utils/api');
const { generateHmacSha256Signature } = require('../utils/hash');

const router = express.Router();

// Get list of valid currencies to send a remittance.
router.get('/origins', async (req, res, next) => {
  const timestamp = new Date().toUTCString();
  const authorizationHash = generateHmacSha256Signature(timestamp);
  const headers = {
    'X-Date': timestamp,
    Authorization: authorizationHash,
  };

  try {
    const response = await api.get('/companies/currency-exchanges/origins', {
      headers,
    });
    res.json({
      message: 'Currency origins list',
      response: response.data,
    });
  } catch (error) {
    next(error);
  }
});

// Get the exchange rates.
router.get('/', async (req, res, next) => {
  // Extract query params => from & to
  const params = req.query;

  const timestamp = new Date().toUTCString();
  const authorizationHash = generateHmacSha256Signature(timestamp);
  const headers = {
    'X-Date': timestamp,
    Authorization: authorizationHash,
  };

  try {
    const response = await api.get('/companies/currency-exchanges', {
      headers,
      params,
    });
    res.json({
      message: 'Currency exchange list',
      response: response.data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
