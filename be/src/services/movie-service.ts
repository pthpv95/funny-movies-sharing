import axios from 'axios';
import { BadRequestError } from "../errors";
import { Movie } from "../models";

class MovieService {
  async createMovie(videoUrl: string, createdBy: string) {
    let videoId = this.getYoutubeVideoIdFromUrl(videoUrl);
    try {
      if (!videoId) {
        await Movie.create({
          createdBy,
          url: videoUrl
        })
        return
      }

      let url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.GOOGLE_API_KEY}&part=snippet`;
      let response = await axios.get(url)
      let { title, description } = response.data.items[0].snippet;
      await Movie.create({
        createdBy,
        title,
        description,
        url: videoUrl
      })
    } catch (error) {
      throw new BadRequestError('CANNOT_CREATE_MOVIE')
    }
  }

  async getMovies() {
    return Movie.find();
  }

  private getYoutubeVideoIdFromUrl(url: string) {
    let regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    }
    return;
  };
}

export const movieService = new MovieService();