import React, { useEffect, useState } from 'react';
import { httpClient } from '../api/httpClient';

interface IMovie {
  _id: string;
  title: string;
  url: string;
  description: string;
  embedId: string;
  createdBy: string;
}

const MovieItem = ({ item }: { item: IMovie }) => {
  return (
    <div className="movie-item">
      <div>
        <iframe
          width={450}
          height={300}
          src={`https://www.youtube.com/embed/${item.embedId}`}
          title={item.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="info">
        <p className="title">{item.title}</p>
        <p><strong>Shared by: {item.createdBy}</strong></p>
        <p><strong>Description: </strong></p>
        <div className="description">{item.description}</div>
      </div>
    </div>
  );
};

const Movies = () => {
  let [movies, setMovies] = useState<IMovie[]>();
  useEffect(() => {
    httpClient.get('/api/movies').then((res) => {
      setMovies(res.data.movies);
    });
  }, []);

  return (
    <div className="movie-list">
      {movies?.map((item) => {
        return <MovieItem key={item._id} item={item} />;
      })}
    </div>
  );
};

export default Movies;
