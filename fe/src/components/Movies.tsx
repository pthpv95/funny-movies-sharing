import { useEffect } from 'react';

const movieList = [
  {
    url: 'https://www.youtube.com/watch?v=V8VHrarg00o&ab_channel=BLVAnhQu%C3%A2n',
    title: 'VÌ SAO KHÔNG CLB NÀO MUỐN RONALDO NGAY LÚC NÀY?',
    sharedBy: 'hien.pham',
    description: 'FREE React Hooks Course: https://courses.webdevsimplified.com/react-hooks-simplified\n\n',
  },
  {
    url: 'https://www.youtube.com/watch?v=V8VHrarg00o&ab_channel=BLVAnhQu%C3%A2n',
    title: 'VÌ SAO KHÔNG CLB NÀO MUỐN RONALDO NGAY LÚC NÀY??',
    sharedBy: 'hien.pham',
    description: 'FREE React Hooks Course: https://courses.webdevsimplified.com/react-hooks-simplified\n\n',
  },
];

let getVideoIdFromUrl = (url: string) => {
  let regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  let match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  }
  return;
};

const MovieItem = ({ item }: any) => {
  return (
    <div className='movie-item'>
      <iframe
        width={400}
        height={250}
        src="https://www.youtube.com/embed/4HZiKcWRFA8"
        title="Diệp Vấn quỳ lạy một tên vô danh tiểu tốt, cứu được con trai lại bị vợ tát sấp mặt | Diệp Vấn 3"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      <div className='info'>
        <p>
          <strong>{item.title}</strong>
        </p>
        <p>
          Shared by: {item.sharedBy}
        </p>
        <p>Description:</p>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

const Movies = () => {
  // useEffect(() => {
  //   let url =
  //     'https://www.youtube.com/watch?v=V8VHrarg00o&ab_channel=BLVAnhQu%C3%A2n';
  //   let videoId = getVideoIdFromUrl(url);
  //   fetch(
  //     `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyBoV4by5aNxIWTmtdIYZh_i4zaDHS3oFqc&part=snippet`
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);
  return (
    <div className="movie-list">
      {movieList.map((item) => {
        return <MovieItem key={item.title} item={item} />;
      })}
    </div>
  );
};

export default Movies;
