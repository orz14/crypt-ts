import crypto from "crypto";

const algorithm = "aes-256-cbc";

/**
 * Get key from env variable (32 bytes, base64-encoded).
 * Throws error if not set.
 */
function getKey(): Buffer {
  const keyBase64 = process.env.NEXT_PUBLIC_CROSS_ENCRYPTION_KEY;
  if (!keyBase64) {
    throw new Error("NEXT_PUBLIC_CROSS_ENCRYPTION_KEY environment variable is not set");
  }
  const keyBuffer = Buffer.from(keyBase64, "base64");
  if (keyBuffer.length !== 32) {
    throw new Error("Decoded key must be 32 bytes");
  }
  return keyBuffer;
}

/**
 * Encrypt plain text using AES-256-CBC
 * @param plainText - Text to encrypt
 * @returns base64 string of (iv + encrypted)
 */
export function encrypt(plainText: string): string {
  const key = getKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  return Buffer.concat([iv, encrypted]).toString("base64");
}

/**
 * Decrypt base64 cipher text (iv + encrypted)
 * @param base64Cipher - base64 string
 * @returns decrypted string
 */
export function decrypt(base64Cipher: string): string {
  const key = getKey();
  const raw = Buffer.from(base64Cipher, "base64");
  const iv = raw.subarray(0, 16);
  const encrypted = raw.subarray(16);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
}
