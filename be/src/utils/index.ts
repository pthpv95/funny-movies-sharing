import bcrypt from 'bcryptjs'

export function encryptPassword(password: string){
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