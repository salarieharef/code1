import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpNarrowWide, Loader2, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SortOptionType {
  value: string;
  label: string;
}

interface SortFilterProps {
  className?: string;
  searchPlaceHolder?: string;
  disableSort?: boolean;
  sort?: string;
  setSort?: (value: string) => void;
  onSearch?: (value: string) => void;
  onToggle?: (open: boolean) => void;
  sortOptions?: SortOptionType[] | null;
  isLoading?: boolean;
  rowReverse?: boolean;
}

const defaultSortOptions = [
  { value: "most_liked", label: "پرمخاطب‌ترین" },
  { value: "most_recent", label: "جدیدترین" },
  { value: "most_viewed", label: "پربازدیدترین" },
];

const SortFilter: React.FC<SortFilterProps> = ({
  className = "",
  searchPlaceHolder = "جستجو کنید",
  disableSort = false,
  sort = "most_liked",
  setSort = () => {},
  onSearch = () => {},
  onToggle = () => {},

  isLoading,
  sortOptions = defaultSortOptions,
  rowReverse = false,
}) => {
  return (
    <div
      className={`${className} flex items-center justify-between gap-x-2 lg:gap-x-8 ${
        rowReverse ? "flex-row-reverse" : ""
      }`}
    >
      <SearchInput
        searchPlaceHolder={searchPlaceHolder}
        onSearch={onSearch}
        isLoading={isLoading}
      />
      {!disableSort && (
        <SortOptions
          sort={sort}
          setSort={setSort}
          sortOptions={sortOptions || []}
        />
      )}

      {onToggle && (
        <Button
          className='flex bg-gradient-to-r from-blue-400 to-blue-500 lg:hidden'
          size='icon'
          onClick={(e: any) => {
            onToggle(e);
          }}
        >
          <Menu className='text-white' />
        </Button>
      )}
    </div>
  );
};

const SearchInput: React.FC<{
  searchPlaceHolder: string;
  onSearch: (value: string) => void;
  isLoading?: boolean;
}> = ({ searchPlaceHolder, onSearch, isLoading }) => (
  <div className='flex w-full min-w-12 items-center overflow-hidden rounded-sm border border-slate-400 bg-white'>
    <Input
      type='text'
      placeholder={searchPlaceHolder}
      className='rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
      onInput={(e) => onSearch(e.currentTarget.value)}
    />
    {isLoading ? <Loader2 className='h-5 w-5 animate-spin' /> : null}
    <Button
      variant='ghost'
      size='icon'
      className='mr-2 hover:bg-transparent'
      name='Search'
    >
      <Search className='stroke-[1.5] text-slate-600' />
    </Button>
  </div>
);

const SortOptions: React.FC<{
  sort: string;
  setSort: (value: string) => void;
  sortOptions: SortOptionType[];
}> = ({ sort, setSort, sortOptions }) => (
  <>
    <DropdownMenu dir='rtl'>
      <DropdownMenuTrigger asChild className='cursor-pointer lg:hidden'>
        <Button
          className='sm:text-md bg-gradient-to-r from-blue-400 to-blue-500 text-white'
          size='icon'
        >
          <ArrowUpNarrowWide className='text-white' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={`cursor-pointer text-base ${
              sort === option.value ? "bg-blue-100 text-blue-600" : ""
            }`}
            onSelect={() => setSort(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    <div className='hidden items-center lg:flex'>
      <h4 className='text-lg text-slate-800 2xl:text-2xl'>مرتب‌سازی:</h4>
      <RadioGroup
        className='mr-5 mt-2 flex flex-row-reverse'
        value={sort}
        onValueChange={setSort}
      >
        {sortOptions.map((option) => (
          <SortOption key={option.value} {...option} />
        ))}
      </RadioGroup>
    </div>
  </>
);

const SortOption: React.FC<SortOptionType> = ({ value, label }) => (
  <div className='flex items-center'>
    <RadioGroupItem className='peer hidden' value={value} id={value} />
    <Label
      className='h-8 w-28 border-0 border-b-white px-2 pt-0 text-center text-base text-slate-800 transition-colors duration-500 hover:cursor-pointer peer-aria-checked:border-b-2 peer-aria-checked:border-b-blue-400 peer-aria-checked:font-semibold peer-aria-checked:text-blue-400 2xl:h-9 2xl:w-32 2xl:text-xl'
      htmlFor={value}
    >
      {label}
    </Label>
  </div>
);

export default SortFilter;
