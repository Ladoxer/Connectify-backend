import { User, IUser } from '../models/User';

class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async findAllExceptEmail(email: string): Promise<IUser[]> {
    return User.find({ email: { $ne: email } });
  }
}

export const userRepository = new UserRepository();