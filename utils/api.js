const axios = require('axios').default;
require('dotenv').config();

const apiKey = process.env.TUCAMBIO_API_KEY || 'x';

const api = axios.create({
  baseURL: 'https://api-sandbox.tucambio.app/api',
  headers: {
    'X-TuCambio-Api-Key': apiKey,
  },
});

module.exports = { api };
