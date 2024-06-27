const { generateHmacSha256Signature } = require('./hash');
const { JWSSign } = require('./jws-signature');

async function makeTuCambioAPIHeaders(payloadJSON) {
  const timestamp = new Date().toISOString();

  const concatenatedData = `${timestamp}${payloadJSON}`;
  const authorizationHash = generateHmacSha256Signature(concatenatedData);

  const { jws_header } = await JWSSign({ payload: payloadJSON });

  const headers = {
    'X-Date': timestamp,
    Authorization: authorizationHash,
    'JWS-Signature': jws_header,
  };

  return headers;
}

module.exports = { makeTuCambioAPIHeaders };
