import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import jwt from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string
    }
  }
}

let mongo: any
beforeAll(async () => {
  process.env.ACCESS_TOKEN_SECRET = "123"
  mongo = new MongoMemoryServer()
  await mongo.start()
  const mongoUri = await mongo.getUri()
  await mongoose.connect(mongoUri)
})

beforeEach(async () => {
  jest.clearAllMocks()
  const collections = await mongoose.connection.db.collections()
  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

export let fakeSignIn = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@gmail.com",
  }

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!)
  return token;
}