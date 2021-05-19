## Create and verify digital signature!

### Usage example

```
//Instal via npm
const digitalSign = require('digital-signing');
const fs = require('fs');

const private_key = fs.readFileSync('keys/privateKey.pem', 'utf-8');
const public_key = fs.readFileSync('keys/publicKey.pem', 'utf-8');

const doc = fs.readFileSync('some-filte.txt');

//Pass key and document to sign
const res = digitalSign.signFile(private_key, doc);

//Verify digital signature
const verifyRes = digitalSign.verifyFile(public_key, res, doc)
```

