import { useEffect, useState } from 'react';
import { Movie } from '../entities/movie.entity';
import IconButton from './IconButton';
import {
  faAngleLeft,
  faAngleRight,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query';
import { fetchMovieDbResults } from '../queries/moviedb-results';
import { queryKeys } from '../queries/queryKeys';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  query: string;
  addMovie: (movie: Movie) => void;
}

export default function MovieDbPreview(props: Props) {
  const {
    data: movies,
    isLoading,
    refetch,
  } = useQuery(queryKeys.movieDbResults, () => {
    return fetchMovieDbResults(props.query);
  });
  useEffect(() => {
    refetch();
  }, [props.query]);
  const [selected, setSelected] = useState(0);
  const filteredMovies = movies
    ? movies.filter((movie) => movie.poster_path)
    : [];
  function handleAddMovie() {
    if (!filteredMovies) {
      return;
    }
    const movie = filteredMovies[selected];
    props.addMovie({
      uuid: '',
      title: movie.title,
      overview: movie.overview,
      cover: movie.poster_path
        ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`
        : '',
      watched: false,
      membersWantingToWatch: [],
      link: `https://www.themoviedb.org/movie/${movie.id}-${movie.title
        .toLowerCase()
        .replace(/ /g, '-')}`,
      dateAdded: new Date(),
      rating: Math.floor(movie.vote_average * 10),
    });
  }
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!filteredMovies || filteredMovies?.length === 0 ? (
            <p>No results found</p>
          ) : (
            <div
              key={filteredMovies[selected].id}
              className="flex flex-col gap-2 p-4 border rounded-xl"
            >
              <p className="text-2xl font-bold">
                {filteredMovies[selected].title}
              </p>
              <img
                className="rounded-xl"
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${filteredMovies[selected].poster_path}`}
                alt={filteredMovies[selected].title}
              />
              <p className="text-xl w-96 text-ellipsis">
                {filteredMovies[selected].overview}
              </p>
              <div className="flex justify-between">
                <button
                  disabled={selected === 0}
                  className="rounded-xl bg-rose px-4 text-light text-2xl"
                  onClick={() => setSelected(selected - 1)}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <IconButton
                  onClick={handleAddMovie}
                  label="Add"
                  icon={faCircleCheck}
                  color="pear"
                />

                <button
                  disabled={selected === filteredMovies.length - 1}
                  className="rounded-xl bg-rose px-4 text-light text-2xl"
                  onClick={() => setSelected(selected + 1)}
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
