import * as crypto from 'crypto';

export const generateSixDigitNumber = () => {
  const randomBytes = crypto.randomBytes(3);
  const hexString = randomBytes.toString('hex');
  const sixDigitNumber = parseInt(hexString, 16) % 1000000;
  return String(sixDigitNumber).padStart(6, '0');
};
