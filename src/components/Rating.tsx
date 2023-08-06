export default function Rating(props: { rating: number }) {
  return (
    <div className="flex px-1 py-2 rounded-full bg-background select-none">
      {props.rating ? (
        <p className={`text-xl text-light font-bold`}>{props.rating}</p>
      ) : (
        <p className="text-xl text-light font-bold">?</p>
      )}
      <p className={`text-sm text-light font-bold py-[3px]`}>%</p>
    </div>
  );
}
