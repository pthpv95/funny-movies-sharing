import { rejects } from 'assert';
import bcrypt from 'bcryptjs'
import { promisify } from "util";

class PasswordService {
  encrypt(password: string){
    return new Promise((res, rej) => {
      bcrypt.genSalt(10, (err, salt) => {
        if(err){
          rej(err)
        }
        bcrypt.hash(password, salt, (err, hash) => {
          if(err){
            rej(err)
          }
          res(hash)
        })
      })
    })
  }
}