import axios from 'axios';
import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import { Movie } from "../models";
import { fakeSignIn } from "./setup";
jest.mock('axios');

describe('GET /api/movies', () => {
  it('should return movies list', async () => {
    await Movie.insertMany([{
      _id: new mongoose.Types.ObjectId(),
      url: 'https://www.youtube.com/watch?v=lFsleRzDZk8&ab_channel=VuongPham',
      title:
        'Movie 1',
      embedId: 'lFsleRzDZk8',
      description: '',
      createdBy: 'hp@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
    },])
    const { body } = await request(app)
      .get("/api/movies")
      .expect(200)
    expect(body.data.movies.length).toEqual(1)
  });
});

describe('POST /api/movies', () => {
  it('should create movie sharing', async () => {
    let videoInfo = { title: 'title', description: 'description' };
    axios.get = jest.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        items: [{
          snippet: videoInfo
        }]
      }
    }));
    let { body } = await request(app)
      .post("/api/movies")
      .auth(fakeSignIn(), { type: 'bearer' })
      .send({
        url: 'https://www.youtube.com/watch?v=zPtSk70VdqY&ab_channel=BLVAnhQu%C3%A2n',
      })
      .expect(201)

    let createdMovie = await Movie.findById(body.data.movie)
    expect(createdMovie).toBeDefined()
    expect(createdMovie?.title).toBe(videoInfo.title)
    expect(createdMovie?.description).toBe(videoInfo.description)
  });
});

describe('POST /api/sign-in', () => {
  it('should handle sign in', async () => {
    const { body } = await request(app)
      .post("/api/sign-in")
      .send({
        email: 'test2gmail.com',
        password: '123456'
      })
      .expect(200)

    expect(body.data.token).toBeDefined()
  });
});
