import cryptoJs from 'crypto-js';

const HASH_KEY = 'dicedicedicedice';

export const encryptUtil = (str: string) => {
  if (!str || typeof str !== 'string') return '';

  return cryptoJs.AES.encrypt(str, cryptoJs.enc.Utf8.parse(HASH_KEY), {
    iv: cryptoJs.enc.Utf8.parse(HASH_KEY),
    padding: cryptoJs.pad.Pkcs7,
    mode: cryptoJs.mode.CBC,
  }).toString();
};

export const decryptUtil = (encryptedText: string) => {
  const decipher = cryptoJs.AES.decrypt(
    encryptedText,
    cryptoJs.enc.Utf8.parse(HASH_KEY),
    {
      iv: cryptoJs.enc.Utf8.parse(HASH_KEY),
      padding: cryptoJs.pad.Pkcs7,
      mode: cryptoJs.mode.CBC,
    },
  );

  return decipher.toString(cryptoJs.enc.Utf8);
};
