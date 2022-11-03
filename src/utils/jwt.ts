import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

export const signJwt = (
  payload: Record<string, unknown>,
  options: SignOptions = {}
) => {
  const privateKey: string = config.get('environment.accessTokenPrivateKey');

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey: string = config.get('environment.accessTokenPublicKey');
    return jwt.verify(token, publicKey) as T;
  } catch (err) {
    return null;
  }
};
