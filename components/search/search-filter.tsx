import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SearchFilterProps } from "@/types/search-filter";
import { Filter, Search, SortAsc } from "lucide-react";
import { useEffect, useState } from "react";

const SearchFilter: React.FC<SearchFilterProps> = ({
  className,
  searchPlaceholder = "عنوان درس یا نام مدرس را جستجو کنید...",
  sort,
  setSort,
  onSearchQueryChange,
  onToggleFilters,
  disableSort = false,
  paramQuery,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (onSearchQueryChange) {
      onSearchQueryChange(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery(paramQuery || "");
    if (onSearchQueryChange) {
      onSearchQueryChange(paramQuery || "");
    }
  }, [paramQuery]);

  return (
    <div
      className={`flex flex-nowrap items-start justify-start gap-x-4 md:flex-row md:items-center md:justify-between ${className}`}
    >
      {!disableSort ? (
        <div className='flex w-full flex-col items-center justify-between sm:flex-row md:justify-start'>
          <div className='flex lg:hidden'>
            <Button
              onClick={() => {
                if (onToggleFilters) {
                  onToggleFilters();
                }
              }}
              variant='link'
              className='relative z-50 flex h-fit w-fit flex-row gap-2 bg-transparent py-1 pl-4 pr-3 text-xs font-medium text-slate-500'
            >
              <Filter className='h-4 w-4 text-slate-800' />
              فیلترها
            </Button>
          </div>
          <div className='flex flex-row items-center gap-4'>
            <h4 className='flex flex-row text-xs font-medium text-slate-500 sm:text-sm md:text-base md:text-slate-800 xl:text-lg'>
              <SortAsc className='h-4 w-4 text-slate-800 md:hidden' />
              مرتب‌سازی:
            </h4>
            <div className='lg:hidden'>
              <Select
                dir='rtl'
                name='search-sort'
                value={sort}
                onValueChange={(v: string) => {
                  if (setSort) setSort(v);
                }}
              >
                <SelectTrigger className='!min-w-[8rem] !max-w-[8rem] rounded-none border-0 bg-transparent text-xs font-bold text-blue-400 ring-0 md:text-base'>
                  <SelectValue
                    className='text-xs font-bold text-blue-400'
                    defaultValue={sort}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='most_liked' className='cursor-pointer'>
                      پرمخاطب‌ترین
                    </SelectItem>
                    <SelectItem value='most_recent' className='cursor-pointer'>
                      جدیدترین
                    </SelectItem>
                    <SelectItem value='most_viewed' className='cursor-pointer'>
                      پربازدیدترین
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <RadioGroup
              value={sort}
              onValueChange={(v: string) => {
                if (setSort) setSort(v);
              }}
              className='hidden gap-3 lg:flex'
              dir='rtl'
            >
              <div className='flex items-center'>
                <RadioGroupItem
                  className='peer hidden'
                  value='most_liked'
                  id='most_liked'
                />
                <Label
                  className='border-0 border-b-white pb-1 pt-0 text-center text-xs text-slate-800 transition-colors duration-500 hover:cursor-pointer peer-aria-checked:border-b-2 peer-aria-checked:border-b-blue-400 peer-aria-checked:font-bold md:text-sm xl:text-base'
                  htmlFor='most_liked'
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>پرمخاطب‌ترین</TooltipTrigger>
                      <TooltipContent className='font-normal'>
                        <p>دروس بیشتر فروش رفته و مشاهده شده.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <div className='flex items-center'>
                <RadioGroupItem
                  className='peer hidden'
                  value='most_recent'
                  id='most_recent'
                />
                <Label
                  className='border-0 border-b-white pb-1 pt-0 text-center text-xs text-slate-800 transition-colors duration-500 hover:cursor-pointer peer-aria-checked:border-b-2 peer-aria-checked:border-b-blue-400 peer-aria-checked:font-bold md:text-sm xl:text-base'
                  htmlFor='most_recent'
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>جدیدترین</TooltipTrigger>
                      <TooltipContent className='font-normal'>
                        <p>دروس جدید ساخته شده.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <div className='flex items-center'>
                <RadioGroupItem
                  className='peer hidden'
                  value='most_viewed'
                  id='most_viewed'
                />
                <Label
                  className='border-0 border-b-white pb-1 pt-0 text-center text-xs text-slate-800 transition-colors duration-500 hover:cursor-pointer peer-aria-checked:border-b-2 peer-aria-checked:border-b-blue-400 peer-aria-checked:font-bold md:text-sm xl:text-base'
                  htmlFor='most_viewed'
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>پربازدیدترین</TooltipTrigger>
                      <TooltipContent className='font-normal'>
                        <p>دروس با بازدید بالا.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      ) : null}

      <div className='flex w-full items-center overflow-hidden rounded-md border border-slate-300 bg-white'>
        <Input
          type='text'
          placeholder={searchPlaceholder}
          className='rounded-none border-0 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm xl:text-base'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button
          variant='ghost'
          size='icon'
          className='mr-2 hover:bg-transparent'
          name='Search'
        >
          <Search className='h-4 w-4 stroke-[1.5] text-slate-600' />
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;
