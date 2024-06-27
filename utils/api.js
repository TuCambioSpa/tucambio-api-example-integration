const axios = require('axios').default;
require('dotenv').config();

const apiKey = process.env.TUCAMBIO_API_KEY || 'x';

const api = axios.create({
  // const apiURL = 'https://sandbox.tucambio.com/api/payouts';
  baseURL: 'http://localhost:4000/api',
  headers: {
    'X-TuCambio-Api-Key': apiKey,
  },
});

module.exports = { api };
