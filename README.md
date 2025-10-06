# @orz14/crypt-ts

Simple AES-256-CBC encryption/decryption utilities for Node.js/TypeScript.

## Installation

```bash
npm install @orz14/crypt-ts
```

## Usage

Make sure the `NEXT_PUBLIC_CROSS_ENCRYPTION_KEY` environment variable is set and contains a base64-encoded key (32 bytes before encoding).

```js
import { encrypt, decrypt } from "@orz14/crypt-ts";

// Encrypt
const cipher = encrypt("hello world");
console.log(cipher); // D5kvEf5S4MAKdLNcTbZdWkMGmI34vQt+LOdP4iU7C+w=

// Decrypt
const plain = decrypt(cipher);
console.log(plain); // hello world
```

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
