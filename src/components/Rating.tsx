export default function Rating(props: { rating: number }) {
  return (
    <div className="flex p-2 rounded-xl bg-background select-none">
      {props.rating ? (
        <p className={`text-xl text-light font-bold`}>{props.rating}</p>
      ) : (
        <p className="text-xl text-light font-bold">?</p>
      )}
      <p className={`text-sm text-light font-bold py-[3px]`}>%</p>
    </div>
  );
}
