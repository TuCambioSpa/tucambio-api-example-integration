const jose = require('jose');
const fs = require('fs');
const { resolve } = require('path');

const ALGORITHM = 'PS256';

async function JWSSign({ payload }) {
  const pkcs8 = fs
    .readFileSync(resolve('./private/private-key.pem'))
    .toString();
  // Load RSA key and certificate from file system
  const privateKey = await jose.importPKCS8(pkcs8, ALGORITHM);

  // Build the JWS with our payload using the header required by Shinkansen and PS256 algorithm
  const jws = new jose.FlattenedSign(
    new Uint8Array(Buffer.from(payload, 'utf-8'))
  ).setProtectedHeader({
    alg: ALGORITHM,
  });

  // Sign with the private key
  const signature = await jws.sign(privateKey);

  // Extract only the protected header and signature, to build the compact
  // detached representation
  const jws_header =
    signature.protected + '.' + signature.payload + '.' + signature.signature;
  return { signature, jws_header };
}

module.exports = { JWSSign };
