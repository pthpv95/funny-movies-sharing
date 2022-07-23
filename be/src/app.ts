import 'dotenv/config';
import express, { Request, Response } from 'express';
import "express-async-errors"
import { json } from "body-parser"
import './db/mongoose'

const app = express()

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello world.")
})

app.post('/api/login', async (req, res) => {

});

const port = process.env.PORT || 3001
app.use(json())
app.listen(port, () => {
  console.log(`Chat app listening at http://localhost:${port}`)
})