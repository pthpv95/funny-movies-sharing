import mongoose from 'mongoose';
mongoose.Promise = global.Promise
// mongoose.set("debug", true)
let url = process.env.MONGODB_URL!;
mongoose.connect(url, {
  dbName: 'funny-movies'
}).catch((e) => {
  console.log('connect db error', e);
})

let connectDb = async () => {
  const url = process.env.MONGODB_URL!;
  try {
    await mongoose.connect(url, {
      dbName: 'funny-movies'
    })
  } catch (error) {
    console.log('connect db error', error);
  }
}

export default connectDb
