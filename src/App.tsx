import { useState } from 'react';
import { Movie } from './entities/movie.entity';
import MovieCard from './MovieCard';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { queryKeys } from './queries/queryKeys';
import { fetchMovies, updateMovie, addMovie } from './queries/movies';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddModal from './components/AddModal';
import FilterSwitch from './components/FilterSwitch';
import { FilterOption } from './entities/filter-option.enum';
import ChooseUsernameModal from './components/ChooseUsernameModal';
import { useCookies } from 'react-cookie';

function App() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [cookies, setCookie] = useCookies(['username', 'filter']);
  const [username, setUsername] = useState(cookies.username);
  const [filter, setFilter] = useState<FilterOption>(
    cookies.filter ? (cookies.filter as FilterOption) : FilterOption.ALL,
  );
  const { data, isLoading } = useQuery(
    queryKeys.movies,
    () => {
      return fetchMovies();
    },
    {
      onSuccess: (data) => {
        setMovies(sortMovies(data, filter));
      },
    },
  );
  const queryClient = useQueryClient();
  const { mutateAsync: mutateAddMovie } = useMutation(
    async (movie: Movie) => {
      return addMovie(movie);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.movies);
      },
    },
  );
  const { mutateAsync: mutateUpdateMovie } = useMutation(
    async (movie: Movie) => {
      return updateMovie(movie);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.movies);
      },
    },
  );
  function sortMovies(data: Movie[], filter: FilterOption): Movie[] {
    const sorted = data.sort((a, b) => {
      return b.dateAdded.getTime() - a.dateAdded.getTime();
    });
    return filter === FilterOption.UNWATCHED
      ? sorted.filter((movie) => !movie.watched)
      : sorted;
  }
  function handleFilterChange(filter: FilterOption) {
    setCookie('filter', filter);
    setFilter(filter);
    setMovies(sortMovies(data ? data : [], filter));
  }

  const [movies, setMovies] = useState<Movie[]>(
    data ? sortMovies(data, FilterOption.ALL) : [],
  );
  function handleChooseUsername(username: string) {
    console.log('writing cookie');
    setCookie('username', username);
    setUsername(username);
  }
  return (
    <>
      {username && (
        <div className="flex gap-2 text-2xl text-light p-2 justify-end">
          <p>Hello</p>
          <p className="font-bold text-robin-egg">{username}</p>
          <p>{'<3'}</p>
        </div>
      )}
      <div className="font-sans flex px-8 py-4">
        {isLoading ? (
          <p className="text-2xl text-light">Loading...</p>
        ) : (
          <>
            {movies.length === 0 ? (
              <p className="text-2xl text-light">
                No movies added yet, add some below!
              </p>
            ) : (
              <div className="flex flex-col pt-16">
                <div className="flex items-center gap-4 px-4">
                  <p className="text-2xl text-light">Eligible movies</p>
                  <FilterSwitch
                    onFilterChange={handleFilterChange}
                    selected={filter}
                  />
                </div>
                <div className="flex flex-wrap">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.uuid}
                      movie={movie}
                      updateMovie={(movie: Movie) => mutateUpdateMovie(movie)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        <button
          onClick={() => setAddModalOpen(true)}
          className="fixed bottom-0 right-0 bg-pear p-4 m-8 rounded-full text-2xl flex items-center justify-center hover:bg-pear-hover transition"
        >
          <FontAwesomeIcon icon={faPlus} className="text-light text-2xl" />
        </button>
      </div>
      <ChooseUsernameModal
        open={!username}
        onClose={() => {}}
        onChooseUsername={handleChooseUsername}
      />
      <AddModal
        open={addModalOpen}
        addMovie={(movie: Movie) => mutateAddMovie(movie)}
        onClose={() => setAddModalOpen(false)}
      />
    </>
  );
}

export default App;
