import bcrypt from 'bcryptjs';
import { User } from "../models/user";
import { encryptPassword } from "../utils";
import { tokenService } from './token-service';

class UserService {
  async register(email: string, password: string) {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('DUPLICATE_EMAIL')
    }

    let encryptedPassword = await encryptPassword(password)
    let user = await User.create({ email, password: encryptedPassword })
    return user;
  }

  async authenticateUser(email: string, password: string){
    let user = await User.findOne({ email });
    if(!user){
      throw new Error('USER_NOT_FOUND')
    }

    const same = await bcrypt.compare(password, user.password)
    if(!same){
      throw new Error('INVALID_USERNAME_PASSWORD')
    }

    let token = tokenService.createAccessToken(user)
    return token;
  }
}

export const userService = new UserService();