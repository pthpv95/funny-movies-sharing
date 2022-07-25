import app from './app';
import connectDb from './db';

let port = process.env.PORT || 3001

let start = async () => {
  await connectDb();
  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log(`Chat app listening at http://localhost:${port}`)
    })
  }
}

start()
