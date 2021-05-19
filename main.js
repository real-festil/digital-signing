const crypto = require('crypto');
const fs = require('fs');

exports.sign = function (private_key, doc) {
  const signer = crypto.createSign('RSA-SHA256');
  signer.write(doc);
  signer.end();

  const signature = signer.sign(private_key, 'base64');

  return signature;
}

exports.verify = function (public_key, signature, doc) {
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.write(doc);
  verifier.end();

  const result = verifier.verify(public_key, signature, 'base64');

  return result;
}