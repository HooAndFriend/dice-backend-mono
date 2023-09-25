import crypto from 'crypto';

export const generateSixDigitNumber = () => {
  const randomBytes = crypto.randomBytes(3);
  const hexString = randomBytes.toString('hex');
  const sixDigitNumber = parseInt(hexString, 16) % 1000000;
  return String(sixDigitNumber).padStart(6, '0');
};

export const encryptData = (data: string) => {
  const iv = Buffer.from(process.env.HASH_IV, 'hex');

  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(process.env.HASH_KEY),
    iv,
  );
  let encryptedData = '';

  cipher.on('readable', () => {
    const chunk = cipher.read();
    if (chunk) {
      encryptedData += chunk.toString('hex');
    }
  });

  cipher.write(data);
  cipher.end();

  return encryptedData;
};

export const decryptData = (data: string) => {
  const iv = Buffer.from(process.env.HASH_IV, 'hex');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(process.env.HASH_KEY),
    iv,
  );
  let decryptedData = '';

  decipher.on('readable', () => {
    const chunk = decipher.read();
    if (chunk) {
      decryptedData += chunk.toString('utf8');
    }
  });

  decipher.write(Buffer.from(data, 'hex'), 'hex');
  decipher.end();

  return decryptedData;
};
