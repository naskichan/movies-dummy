import { useState } from 'react';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

interface Props {
  open: boolean;
  onClose: () => void;
  onChooseUsername: (username: string) => void;
}

export default function ChooseUsernameModal(props: Props) {
  const [userName, setUserName] = useState('');
  return (
    <Modal transparent open={props.open} onClose={props.onClose}>
      <div className="flex flex-col items-center bg-accent p-4 rounded-xl">
        <p className="text-3xl text-light mb-8">
          Welcome to the Movie Night app!
        </p>
        <div className="flex w-full bg-background rounded-full px-4 items-center">
          <input
            onKeyDown={(event) => {
              if (event.key === 'Enter' && userName.length > 0) {
                props.onChooseUsername(userName);
              }
            }}
            type="text"
            className="w-full p-2 text-2xl focus:outline-none rounded-xl bg-background text-white caret-light"
            placeholder="Please choose a username..."
            autoFocus
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <button
            className="flex"
            onClick={() => props.onChooseUsername(userName)}
          >
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={`${
                userName.length === 0 ? 'text-rose' : 'text-pear'
              } text-2xl transition`}
            />
          </button>
        </div>
      </div>
    </Modal>
  );
}
