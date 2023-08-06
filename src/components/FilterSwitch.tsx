import { FilterOption } from '../entities/filter-option.enum';

interface Props {
  onFilterChange: (filter: FilterOption) => void;
  selected: FilterOption;
}

export default function FilterSwitch(props: Props) {
  return (
    <div className="flex rounded-xl bg-accent">
      <FilterButton
        onClick={() => props.onFilterChange(FilterOption.ALL)}
        selected={props.selected === FilterOption.ALL}
      >
        All
      </FilterButton>
      <FilterButton
        onClick={() => props.onFilterChange(FilterOption.UNWATCHED)}
        selected={props.selected === FilterOption.UNWATCHED}
      >
        Unwatched
      </FilterButton>
    </div>
  );
}

export function FilterButton(props: {
  onClick: () => void;
  selected: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={props.onClick}
      className={` px-4 py-2 flex justify-center first:rounded-l-xl last:rounded-r-xl transition ${
        props.selected
          ? 'bg-pear hover:bg-pear-hover text-black'
          : 'hover:bg-gray-800 text-light'
      }`}
    >
      {props.children}
    </button>
  );
}
