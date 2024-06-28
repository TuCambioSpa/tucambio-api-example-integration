const express = require('express');

const currencyExchangesRoute = require('./routes/currency-exchanges');
const payoutsRoute = require('./routes/payouts');

// Create an instance of the Express application
const app = express();
const PORT = 7700; // Set the port for the server (you can use any port you prefer)

// Middleware to parse JSON in request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// currency exchanges routes
app.use('/currency-exchanges', currencyExchangesRoute);

// payouts routes
app.use('/payouts', payoutsRoute);

// Catch all errors
app.use((error, req, res, next) => {
  console.error(`Error data`, error.response?.data);
  console.error(`Error message`, error.message);
  res.status(error.response?.status || 500).json({
    error: `Request failed. Error: ${error.message}`,
    data: error.response?.data,
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
