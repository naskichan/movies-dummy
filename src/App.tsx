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

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterOption>(FilterOption.ALL);
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
    setFilter(filter);
    setMovies(sortMovies(data ? data : [], filter));
  }
  const [movies, setMovies] = useState<Movie[]>(
    data ? sortMovies(data, FilterOption.ALL) : [],
  );
  return (
    <>
      <div className="font-sans flex p-8">
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
                <div className="flex items-center gap-4">
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
          onClick={() => setModalOpen(true)}
          className="fixed bottom-0 right-0 bg-pear p-4 m-8 rounded-full text-2xl flex items-center justify-center hover:bg-pear-hover transition"
        >
          <FontAwesomeIcon icon={faPlus} className="text-light text-2xl" />
        </button>
      </div>
      <AddModal
        open={modalOpen}
        addMovie={(movie: Movie) => mutateAddMovie(movie)}
        onClose={() => setModalOpen(false)}
      />
      <p className="text-2xl text-light">
        Feature to make movie watched show the description of a movie (maybe on
        click?) account management, one user can only vote once per movie
      </p>
    </>
  );
}

export default App;
