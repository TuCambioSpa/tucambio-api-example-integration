# Node.js Tu Cambio API Example Project

This Node.js project is a simple implementation for handling payouts and notifications using the TuCambio API.

## Features

- **Payouts**: Handle cashout requests using the TuCambio API.
- **Automatic Signature Calculation**: The project automatically calculates signatures for payouts based on the provided request payloads and the secret key.
- **Automatic Signature Calculation using a certificate**: The project automatically calculates signatures for payouts based on the provided request payloads but now using a certificate.
- **Notifications**: Receive notifications from TuCambio API on status changes.

## Configuration

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure API Credentials:**

* Create a new .env file or rename the .env.example file and set the values of the **TUCAMBIO_API_KEY** and **TUCAMBIO_SECRET_KEY** variables with your TuCambio API credentials.
* Generate a private key file and save on the private folder for submit payouts.

3. **Run the Application:**

   ```bash
   npm start
   ```

3. **Endpoints:**

**POST /payouts**
- Example Body:

    ```json
    {
        "amount": 1500,
        "fromCurrencyId": 1,
        "toCurrencyId": 2,
        "description": "remittance",
        "recipient": {
            "name": "John Doe",
            "account_number": "01341919522567890000",
            "account_type": "Cuenta Bancaria",
            "bank_name": "Banesco",
            "document_id": "12345678-1",
            "document_type": "V"
        }
    }
    ```

**GET /payouts**
- Example Query Params:
    ```json
    {
        "id": "f1b667a8-7f7a-40a8-a313-a468a2adb059"
    }
    ```

**GET /currency-exchanges/origins**

**GET /currency-exchanges**
- Example Query Params:
    ```json
    {
        "from": 1,
        "to": 2
    }
    ```

## Additional Notes
* Ensure Node.js and npm are installed on your machine.
* For testing purposes, use the TuCambio sandbox environment.
* Customize the notification logic in **notifications.js**.
* The Private Key file (**private-key.pem**) will be saved in the private folder on project directory.

## Dependencies
* [Express](https://expressjs.com/): Web framework for Node.js.
* [Axios](https://axios-http.com/): HTTP client for making requests.
* [crypto.js](https://cryptojs.gitbook.io/docs): Node.js crypto library for HMAC generation.
* [jose](https://www.npmjs.com/package/jose): JavaScript module for JSON Object Signing and Encryption.

## License
This project is licensed under the MIT License.