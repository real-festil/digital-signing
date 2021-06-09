const crypto = require('crypto');
const p12 = require('p12-pem');

exports.signFile = function (cert_path, password, doc) {
  const {pemKey} = p12.getPemFromP12(cert_path, password);
  const signer = crypto.createSign('RSA-SHA256');
  signer.write(doc);
  signer.end();

  const signature = signer.sign('-----BEGIN RSA PRIVATE KEY-----\n' +pemKey.split('-----')[2] + '\n-----END RSA PRIVATE KEY-----', 'base64');

  return signature;
}

exports.verifyFile = function (cert_path, password, signature, doc) {
  const {pemCertificate} = p12.getPemFromP12(cert_path, password);
  const public_key = crypto.createPublicKey('-----BEGIN CERTIFICATE-----\n' +pemCertificate.split('-----')[2] + '\n-----END CERTIFICATE-----').export({type:'spki', format:'pem'})
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.write(doc);
  verifier.end();

  const result = verifier.verify(public_key, signature, 'base64');

  return result;
}