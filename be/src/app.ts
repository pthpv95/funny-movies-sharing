import { json } from "body-parser";
import 'dotenv/config';
import express, { Request, Response } from 'express';
import "express-async-errors";
import './db/mongoose';
import { userService } from './services/user-service';

let app = express()
app.use(json())

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello world.")
})

app.post('/api/login', async (req, res) => {

});

app.post('/api/register', async (req, res) => {
  let body = req.body
  console.log("🚀 ~ file: app.ts ~ line 20 ~ app.post ~ body", body)
  let user = await userService.register(body.email, body.password);
  res.send({ data: user });
});

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Chat app listening at http://localhost:${port}`)
})