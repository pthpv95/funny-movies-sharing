import { json } from "body-parser";
import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import "express-async-errors";

import './db/mongoose';
import { authorized, errorHandler } from "./middlewares";
import { movieService } from "./services/movie-service";
import { tokenService } from "./services/token-service";
import { userService } from './services/user-service';

let app = express()
app.use(cors({
  origin: process.env.ALLOW_ORIGIN_HOST,
  credentials: true
}))

app.use(json())
app.get("/", async (req: Request, res: Response) => {
  res.send("Hello world.")
})

app.post('/api/login', async (req, res) => {
  let { email, password } = req.body
  let token = await userService.authenticateUser(email, password)
  tokenService.sendRefreshToken(res, token);
  res.status(200).send({ data: { token } })
});

app.post('/api/register', async (req, res) => {
  let body = req.body
  let user = await userService.register(body.email, body.password);
  res.send({ data: { user } });
});

app.post('/api/movies', authorized, async (req, res) => {
  let body = req.body
  let createdBy = 'hp@mgail.com';
  console.log("🚀 ~ file: app.ts ~ line 39 ~ app.post ~ body", body)
  await movieService.createMovie(body.url, createdBy);
  res.send();
});

app.get('/api/movies', async (req, res) => {
  let movies = await movieService.getMovies();
  res.send({ data: { movies } });
});

app.use(errorHandler)

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Chat app listening at http://localhost:${port}`)
})