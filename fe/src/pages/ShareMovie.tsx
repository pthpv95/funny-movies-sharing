import { useState } from 'react';
import { httpClient } from '../api/httpClient';
import { useNavigate } from 'react-router-dom';

let ShareMovie = () => {
  let navigate = useNavigate();
  let [url, setUrl] = useState('');
  let handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await httpClient.post('/api/movies', {
        url,
      });
      setUrl('');
      alert('Share movie successfully')
      navigate('/')
    } catch (err: any) {
      let { errors } = await err.json();
      alert(errors[0].message);
    }
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
              autoFocus
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
