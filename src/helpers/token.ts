import { verify, sign, JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import 'dotenv/config';
import { IUser } from '../interfaces/user.interfaces';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export const generateToken = (user: Omit<IUser, 'password'>) => {
  const token = sign(
    user,
    process.env.JWT_SECRET || 'secret',
    jwtConfig as SignOptions,
  );
  return token;
};

export const authenticate = (token: string): JwtPayload => {
  const decoded = verify(token, process.env.JWT_SECRET || 'secret' as Secret);
  console.log('decodeeed', decoded);
  
  return decoded as JwtPayload;
};
