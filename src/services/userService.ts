import { generateToken, verifyToken } from '../Utils/token';
import { userRepository } from '../repositories/userRepository';

class UserService {
  async getUsersExceptCurrent(token: string) {
    const decoded: any = verifyToken(token);
    return userRepository.findAllExceptEmail(decoded.email);
  }

  async loginUser(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    const token = generateToken(user);
    return token;
  }
}

export const userService = new UserService();