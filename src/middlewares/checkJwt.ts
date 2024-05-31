import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';

export const checkJwt = (socket: Socket, next: NextFunction) => {
  const token = socket.handshake.query.token as string;

  if (!token) {
    return next(new Error('Access denied. No token provided.'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    socket.user = decoded;
    next();
  } catch (error) {
    return next(new Error('Invalid token.'));
  }
};
