"use client";
import * as React from "react";

// Icon imports
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";

// Component imports
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

// Util imports
import { cn } from "@/utils/cn";

// Hook imports
import { useDebounce } from "@/hooks/ui";
import { useIntersection } from "@mantine/hooks";
import { Input } from "./input";

interface AutocompleteProps {
  list?: any[];
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  classNamePlaceholder?: string;
  onChange?: (value: string | null, label?: string) => void;
  defaultValue?: string | number;
  setSize?: any;
  size?: any;
  isValidating?: boolean;
  page_number?: number;
  onSearch?: (term: string) => void;
  children?: React.ReactNode;
  withoutSearch?: boolean;
  labelTeacher?: boolean;
  label_firstName_teacher?: string;
  label_lastName_teacher?: string;
  allowCreate?: boolean;
}

export function Autocomplete({
  list = [],
  placeholder = "انتخاب کنید...",
  emptyMessage = "موردی یافت نشد.",
  disabled = false,
  loading = false,
  className,
  classNamePlaceholder,
  onChange,
  defaultValue,
  setSize,
  size,
  isValidating = false,
  page_number,
  onSearch,
  children,
  withoutSearch = false,
  labelTeacher,
  label_firstName_teacher,
  label_lastName_teacher,
  allowCreate = false,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | number | undefined>(
    defaultValue || ""
  );
  const [displayValue, setDisplayValue] = React.useState<string>("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [fullList, setFullList] = React.useState(list);
  const [filteredList, setFilteredList] = React.useState(list);
  const [customValue, setCustomValue] = React.useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  // Update value and display value when defaultValue changes
  React.useEffect(() => {
    setValue(defaultValue);
    if (defaultValue) {
      const selectedItem = list.find((item) => item.value == defaultValue);
      if (selectedItem) {
        const display = labelTeacher
          ? `${selectedItem.label_firstName_teacher ?? ""} ${
              selectedItem.label_lastName_teacher ?? ""
            } - ${selectedItem.label}`
          : selectedItem.label;
        setDisplayValue(display);
      }
    } else {
      setDisplayValue("");
    }
  }, [defaultValue, list, labelTeacher]);

  // Update list and filtered list when list prop changes
  React.useEffect(() => {
    setFullList(list);
    setFilteredList(list);
  }, [list]);

  // Handle debounced search
  React.useEffect(() => {
    if (debouncedSearchTerm || debouncedSearchTerm === "") {
      onSearch?.(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  // Infinite scrolling logic
  const lastClass = React.useRef(null);
  const { ref, entry } = useIntersection({
    root: lastClass.current,
    threshold: 1,
  });

  React.useEffect(() => {
    if (
      page_number &&
      page_number > 1 &&
      entry?.isIntersecting &&
      size !== page_number &&
      !isValidating
    ) {
      setSize(size + 1);
    }
  }, [entry, page_number, setSize, size, isValidating]);

  // Handle selection of an item
  const handleSelect = (currentValue: string) => {
    if (currentValue == value) {
      // If clicking the selected item again, clear the selection
      setValue(""); // Clear the selected value
      setDisplayValue(""); // Clear the displayed label
      onChange?.(null, ""); // Trigger onChange with null to signal deselection
    } else {
      // Otherwise, select the new item as usual
      const selectedItem = fullList.find((item) => item.value === currentValue);
      if (selectedItem) {
        const display = labelTeacher
          ? `${selectedItem.label_firstName_teacher ?? ""} ${
              selectedItem.label_lastName_teacher ?? ""
            } - ${selectedItem.label}`
          : selectedItem.label;

        setValue(currentValue);
        setDisplayValue(display);
        onChange?.(currentValue, selectedItem.label);
      }
    }

    setOpen(false); // Close the dropdown after selection or deselection
    setFilteredList(fullList); // Reset the filtered list to the full list
    setCustomValue(""); // Reset custom input value
    setSearchTerm(""); // Reset search term
  };

  // Handle creation of new item
  const handleCreateNew = () => {
    setValue(customValue);
    setDisplayValue(customValue);
    onChange?.(null, customValue);
    setOpen(false);
    setFilteredList(fullList); // Reset filtered list to full list
    setCustomValue("");
    setSearchTerm(""); // Reset search term
  };

  // Update search term and filter list based on it
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCustomValue(term);
    if (term) {
      const filtered = fullList.filter((item) =>
        item.label.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredList(filtered);
    } else {
      setFilteredList(fullList); // Reset filtered list to full list when search is empty
    }
  };

  // Check if the current search term exists in the list
  const searchTermExists = React.useMemo(() => {
    return filteredList.some(
      (item) => item?.label?.toLowerCase() === searchTerm.toLowerCase()
    );
  }, [filteredList, searchTerm]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(`justify-between`, className)}
        >
          <span className={cn("truncate ", classNamePlaceholder)}>
            {!loading && displayValue ? displayValue : placeholder}
          </span>

          {loading ? (
            <Loader2 className='h-5 w-5 animate-spin' />
          ) : (
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='p-0'>
        <Command>
          {!withoutSearch && (
            <Input
              placeholder='سرچ کنید...'
              value={customValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
          )}

          <CommandGroup>
            <ScrollArea className='h-72 p-0' dir='rtl'>
              {filteredList.map((item, i) => (
                <div
                  ref={i + 1 === filteredList.length ? ref : null}
                  key={item.value}
                >
                  <CommandItem
                    value={item.value}
                    onSelect={() => handleSelect(item.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value == item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {labelTeacher &&
                      `${item?.label_firstName_teacher ?? ""} ${
                        item?.label_lastName_teacher ?? ""
                      } - `}
                    {item.label}
                  </CommandItem>
                </div>
              ))}

              {/* Show create option if allowed and search term doesn't exist */}
              {allowCreate
                ? customValue &&
                  !searchTermExists &&
                  !isValidating &&
                  filteredList.length === 0 && (
                    <CommandItem onSelect={handleCreateNew}>
                      <Plus className='mr-2 h-4 w-4' />
                      افزودن {`"${customValue}"`}
                    </CommandItem>
                  )
                : null}

              {isValidating ? (
                <div className='mt-2 flex justify-center'>
                  <Loader2 className='animate-spin' />
                </div>
              ) : null}

              {!isValidating && filteredList.length === 0 ? (
                <CommandEmpty>{emptyMessage}</CommandEmpty>
              ) : null}

              {children}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
