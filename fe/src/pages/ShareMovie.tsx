import { useState } from 'react';
import { httpClient } from '../api/httpClient';

let ShareMovie = () => {
  let [url, setUrl] = useState('');
  let handleSubmit = async (e: any) => {
    e.preventDefault();

    await httpClient.post('/api/movies', {
      url,
    });
    setUrl('');
  };

  return (
    <div className="share-movie">
      <fieldset>
        <legend>Share a Youtube movie</legend>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Youtube URL: </label>
            <input
              required
              type={'text'}
              value={url}
              onChange={(e: any) => setUrl(e.target.value)}
            />
          </div>
          <button type="submit">Share</button>
        </form>
      </fieldset>
    </div>
  );
};

export default ShareMovie;
