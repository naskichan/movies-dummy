interface Props {
  open: boolean;
  transparent?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal(props: Props) {
  return (
    <>
      {props.open && (
        <div
          id="background"
          className="absolute inset-0 bg-black bg-opacity-50 grid place-items-center"
          onClick={(event) => {
            if (event.target !== event.currentTarget) {
              return;
            }
            props.onClose();
          }}
        >
          <div
            className={`${
              props.transparent ? 'bg-transparent' : 'bg-light'
            } rounded-xl py-4 px-6`}
          >
            {props.children}
          </div>
        </div>
      )}
      ;
    </>
  );
}
