import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar(props: Props) {
  const [value, setValue] = useState('');
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      props.onSearch(value);
    }
  }
  return (
    <div className="flex gap-2 border bg-white border-accent rounded-xl">
      <input
        placeholder="Search for a movie..."
        type="text"
        className="w-full p-2 text-2xl rounded-xl"
        onKeyDown={handleKeyDown}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        value={value}
      />
      <button
        className="flex items-center p-4"
        onClick={() => props.onSearch(value)}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
