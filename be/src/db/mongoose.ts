import mongoose from 'mongoose'
mongoose.Promise = global.Promise
// mongoose.set("debug", true)
const url = process.env.MONGODB_URL!;
mongoose.connect(url, {
  dbName: 'funny-movies'
}).catch((e) => {
  console.log('connect db error', e);
})

export default { mongoose }
