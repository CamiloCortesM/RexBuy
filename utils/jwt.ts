import jwt from 'jsonwebtoken';

export const signJWT = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No JWT seed, check the .env file');
  }

  return jwt.sign({ email, _id }, process.env.JWT_SECRET_SEED, {
    expiresIn: '4h',
  });
};

export const isValidToken = (token = ''): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No JWT seed, check the .env file');
  }

  if (token.length <= 10) {
    return Promise.reject('JWT no valido');
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) {
          return reject('Invalid token');
        }

        const { _id } = payload as { _id: string };
        resolve(_id);
      });
    } catch (error) {
      reject('Invalid token');
    }
  });
};
