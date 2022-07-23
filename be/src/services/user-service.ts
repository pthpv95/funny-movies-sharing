import bcrypt from 'bcryptjs';
import { BadRequestError, NotFoundError } from '../errors';
import { User } from "../models";
import { encryptPassword } from "../utils";
import { tokenService } from './token-service';

class UserService {
  async register(email: string, password: string) {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('DUPLICATE_EMAIL')
    }

    let encryptedPassword = await encryptPassword(password)
    let user = await User.create({ email, password: encryptedPassword })
    return user;
  }

  async authenticateUser(email: string, password: string){
    let user = await User.findOne({ email });
    if(!user){
      throw new NotFoundError('USER_NOT_FOUND')
    }

    let same = await bcrypt.compare(password, user.password)
    if(!same){
      throw new BadRequestError('INVALID_USERNAME_PASSWORD')
    }

    let token = tokenService.createAccessToken(user)
    return token;
  }
}

export const userService = new UserService();