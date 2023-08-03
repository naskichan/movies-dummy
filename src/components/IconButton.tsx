import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  label: string;
  icon: IconProp;
  color: string;
  onClick: () => void;
}

export default function IconButton(props: Props) {
  return (
    <>
      {props.color === 'rose' ? (
        <button
          className={`text-4xl bg-rose hover:bg-rose-hover rounded-xl flex items-center gap-2 p-2 transition`}
          onClick={props.onClick}
        >
          <FontAwesomeIcon className="text-light" icon={props.icon} />
          <p className="text-light text-2xl">{props.label}</p>
        </button>
      ) : (
        <button
          className={`text-4xl bg-pear hover:bg-pear-hover rounded-xl flex items-center gap-2 p-2 transition`}
          onClick={props.onClick}
        >
          <FontAwesomeIcon className="text-light" icon={props.icon} />
          <p className="text-light text-2xl">{props.label}</p>
        </button>
      )}
    </>
  );
}
