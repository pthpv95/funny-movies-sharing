import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
export interface UserAttrs {
  email: string
  password: string
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

export interface UserDoc extends mongoose.Document {
  email: string
  password: string
  tokenVersion: number
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      },
    },
  }
)

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

userSchema.pre('save', function (next) {
  let user: any = this
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (_err: any, salt: any) => {
      bcrypt.hash(user.password, salt, (_err: any, hash: any) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

const User = mongoose.model<UserDoc, UserModel>("users", userSchema)

export { User }
