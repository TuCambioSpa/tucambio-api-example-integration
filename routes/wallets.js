const express = require('express');

const { api } = require('../utils/api');
const { generateHmacSha256Signature } = require('../utils/hash');

const router = express.Router();

// Get the balance of wallets.
router.get('/', async (req, res, next) => {
  const timestamp = new Date().toUTCString();
  const authorizationHash = generateHmacSha256Signature(timestamp);
  const headers = {
    'X-Date': timestamp,
    Authorization: authorizationHash,
  };

  try {
    const response = await api.get('/companies/balance', {
      headers,
    });
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// Get the balance of a wallet.
router.get('/currencies/:currencyId', async (req, res, next) => {
  const { currencyId } = req.params;

  const timestamp = new Date().toUTCString();
  const authorizationHash = generateHmacSha256Signature(timestamp);
  const headers = {
    'X-Date': timestamp,
    Authorization: authorizationHash,
  };

  try {
    const response = await api.get(
      `/companies/balance/currencies/${currencyId}`,
      {
        headers,
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
