import jwt from 'jsonwebtoken'
// import { IUser } from '../models/User';
import dotenv from 'dotenv';
dotenv.config();


// export const generateToken = (user: IUser) => {
//   return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
//     expiresIn: '1d',
//   });
// }

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}