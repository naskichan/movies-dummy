import { Movie } from '../entities/movie.entity';
import Modal from './Modal';
import SearchBar from './SearchBar';
import { useState } from 'react';
import MovieDbPreview from './MovieDbPreview';

interface Props {
  addMovie: (movie: Movie) => void;
  onClose: () => void;
  open: boolean;
}

export default function AddModal(props: Props) {
  const [query, setQuery] = useState('');

  return (
    <Modal onClose={props.onClose} open={props.open}>
      <>
        <p className="text-3xl font-bold text-accent">Add a new Movie</p>
        <div className="flex flex-col gap-4 py-6">
          <SearchBar onSearch={(query: string) => setQuery(query)} />
        </div>
      </>
      {query && <MovieDbPreview query={query} addMovie={props.addMovie} />}
    </Modal>
  );
}
