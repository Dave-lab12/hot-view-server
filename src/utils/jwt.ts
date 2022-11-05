import jwt, { SignOptions } from 'jsonwebtoken';

import config from '../../config/default';

export const signJwt = (
  payload: Record<string, unknown>,
  options: SignOptions = {}
) => {
  // const { server } = config;
  // console.log(accessTokenPublicKey);
  const privateKey = config.app.environment.accessTokenPrivateKey as string;

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

// export const verifyJwt = <T>(token: string): T | null => {
//   try {
//     const publicKey: string = config.get('environment.accessTokenPublicKey');
//     return jwt.verify(token, publicKey) as T;
//   } catch (err) {
//     return null;
//   }
// };
export const verifyJwt = (token: string) => {
  try {
    const publicKey = config.app.environment.accessTokenPublicKey as string;
    const decoded = jwt.verify(token, publicKey);
    return { payload: decoded, expired: false };
  } catch (error) {
    return {
      payload: null,
      expired: (error as Error).message.concat('jwt expired'),
    };
  }
};
