import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions
) => {
  const privateKey = config.get<string>(keyName)

    
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    // algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey'
): T | null => {
  try {
    const publicKey = config.get<string>(keyName)
    const decoded = jwt.verify(token, publicKey) as T;


    return decoded;
  } catch (error) {
    return null;
  }
};