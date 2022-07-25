import axios from 'axios';
import { BadRequestError } from "../errors";
import { Movie } from "../models";

class MovieService {
  async createMovie(videoUrl: string, createdBy: string) {
    let videoId = this.getYoutubeVideoIdFromUrl(videoUrl);
    if (!videoId) {
      throw new BadRequestError('INVALID_URL')
    }
    try {
      let url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.GOOGLE_API_KEY}&part=snippet`;
      let response = await axios.get(url)
      let item = response.data.items[0]
      let { title, description } = item.snippet;
      return Movie.create({
        createdBy,
        title,
        description,
        url: videoUrl,
        embedId: item.id
      })
    } catch (error) {
      throw new BadRequestError('CANNOT_CREATE_MOVIE')
    }
  }

  async getMovies() {
    return Movie.find().sort({ createdAt: -1 });
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