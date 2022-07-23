import { User } from "../models/user";

class UserService {
  async register(email: string, password: string) {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('DUPLICATE_EMAIL')
    }

    let user = await User.create({ email, password })
    return user;
  }
}

export const userService = new UserService();