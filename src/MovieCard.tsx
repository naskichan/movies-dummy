import { faCircleCheck as faCircleCheckSolid } from '@fortawesome/free-solid-svg-icons';
import { Movie } from './entities/movie.entity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate } from './helpers/date.helper';
import { Tooltip } from 'react-tooltip';
import { useState } from 'react';
import { faCircleCheck as faCircleCheckLight } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  movie: Movie;
  updateMovie: (movie: Movie) => void;
}

function MovieCard(props: Props) {
  const [decidedBefore, setDecidedBefore] = useState(false);
  function handleIncreaseWatchCount() {
    props.updateMovie({
      ...props.movie,
      watchCount: decidedBefore
        ? props.movie.watchCount - 1
        : props.movie.watchCount + 1,
    });
    decidedBefore ? setDecidedBefore(false) : setDecidedBefore(true);
  }
  return (
    <div className="flex flex-col max-w-sm rounded-xl bg-accent border border-gray-600 m-4">
      <div
        className="flex relative group cursor-pointer"
        onClick={() => {
          window.open(props.movie.link);
          console.log(props.movie.link);
        }}
      >
        <img
          className={`rounded-t-xl ${props.movie.watched && 'grayscale'}`}
          src={props.movie.cover}
          alt={props.movie.title}
        />
        <div className="absolute top-0 right-0 p-2  flex justify-center">
          {props.movie.watched ? (
            <>
              <FontAwesomeIcon
                data-tooltip-id={`watched${props.movie.uuid}`}
                icon={faCircleCheckSolid}
                onClick={(e) => {
                  e.stopPropagation();
                  props.updateMovie({ ...props.movie, watched: false });
                }}
                className="text-pear text-4xl"
              />
              <Tooltip id={`watched${props.movie.uuid}`} place="bottom">
                Already watched, undo?
              </Tooltip>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                data-tooltip-id={`markAsWatched${props.movie.uuid}`}
                icon={faCircleCheckLight as IconProp}
                className="text-light hover:opacity-100 text-4xl opacity-50 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  props.updateMovie({ ...props.movie, watched: true });
                }}
              />
              <Tooltip id={`markAsWatched${props.movie.uuid}`} place="bottom">
                Mark as watched
              </Tooltip>
            </>
          )}
        </div>
        <div className="absolute bottom-0 px-4 py-12 bg-gradient-to-t from-accent to-transparent w-full group-hover:visible invisible">
          <p className="p-2 pt-4 text-2xl font-bold text-light">
            {props.movie.title}
          </p>
        </div>
      </div>
      <div className="flex pt-8 p-4">
        <p className="flex-grow text-light text-xl">
          Added {formatDate(props.movie.dateAdded)}
        </p>
        <div
          data-tooltip-id={`watchCount${props.movie.uuid}`}
          className={`flex ${
            decidedBefore ? 'bg-blue-accent' : 'bg-background'
          } py-1 px-2 rounded-xl items-center gap-2 cursor-pointer hover:bg-gray-400 transition`}
          onClick={handleIncreaseWatchCount}
        >
          <FontAwesomeIcon
            icon={faCircleCheckSolid}
            className="text-pear text-xl"
          />
          <p className="text-light text-xl">{props.movie.watchCount}</p>
          <Tooltip id={`watchCount${props.movie.uuid}`} place="top">
            {props.movie.watchCount === 1
              ? `${props.movie.watchCount} person wants to watch this`
              : `${props.movie.watchCount} people want to watch this`}
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
