import { differenceInHours } from 'date-fns';
import { differenceInDays } from 'date-fns';
import { addHours, nextMonday } from 'date-fns';

export default function NextMovieNight() {
  function nextMovieNight(): string {
    const monday = nextMonday(Date.now());
    const mondayEvening = addHours(monday, 19);
    console.log(mondayEvening.toLocaleDateString());
    if (differenceInHours(mondayEvening, Date.now()) > 24) {
      return `in ${differenceInDays(mondayEvening, Date.now())} day(s)`;
    }
    return `in ${differenceInHours(mondayEvening, Date.now())} hours`;
  }
  return (
    <div className="flex p-4 mx-8 w-[22rem] rounded-xl bg-accent items-center gap-2">
      <p className="text-2xl text-light">Next Movie Night</p>
      <p className="bg-blue-accent rounded-xl px-2 py-1 text-white font-mono flex items-center">
        {nextMovieNight()}
      </p>
    </div>
  );
}
