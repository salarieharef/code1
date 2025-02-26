"use client";

import { ChevronsDownUp, ChevronsUpDown, Loader2 } from "lucide-react";
import * as React from "react";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/utils/cn";
import { useIntersection } from "@mantine/hooks";
import { Command as CommandPrimitive } from "cmdk";
import { forwardRef } from "react";

// Util imports
import { ScrollArea } from "@radix-ui/react-scroll-area";
import some from "lodash-es/some";

type Option = Record<"title" | "id", string>;
interface MultiSelectProps extends React.ComponentPropsWithoutRef<"a"> {
  list: Option[];
  placeholder?: string;
  onSearch?: any;
  loading?: boolean;
  isValidating?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  setSize?: any;
  size?: any;
  page_number?: number;
  emptyMessage?: string;
  inputClassName?: string;
}
export const MultiSelectCheckBox = forwardRef<
  React.ElementRef<"a">,
  MultiSelectProps
>(
  ({
    emptyMessage,
    list,
    placeholder,
    onChange,
    className,
    children,
    onSearch,
    isValidating,
    loading,
    disabled,
    defaultValue,
    setSize,
    size,
    page_number,
    inputClassName,
    ...props
  }: any) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<Option[]>(
      defaultValue || []
    );

    React.useEffect(() => {
      setSelected(defaultValue);
    }, [defaultValue]);

    const lastClass = React.useRef<HTMLElement>(null);
    const { ref, entry } = useIntersection({
      root: lastClass.current,
      threshold: 1,
    });
    const handleUnselect = React.useCallback((option: Option) => {
      setSelected((prev) => prev.filter((s) => s.id !== option.id));
    }, []);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "") {
              setSelected((prev) => {
                const newSelected = [...prev];
                newSelected.pop();
                return newSelected;
              });
            }
          }
          // This is not a default behaviour of the <input /> field
          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      []
    );

    const selectables = list?.filter((option: any) => !some(selected, option));

    React.useEffect(() => {
      if (entry?.isIntersecting && size !== page_number) {
        setSize(size + 1);
      }
    }, [entry, page_number]);

    const handleCheckboxChange = React.useCallback(
      (option: Option) => {
        let newSelected = [...selected];

        if (option.id === "all") {
          if (newSelected.some((item) => item.id === "all")) {
            newSelected = [];
            onChange?.([]);
          } else {
            newSelected = [{ id: "all", title: "همه" }];
            onChange?.([{ id: "all", title: "همه" }]);
          }
        } else {
          const index = newSelected.findIndex((el) => el.id === option.id);

          if (index === -1) {
            newSelected.push(option);
          } else {
            newSelected.splice(index, 1);
          }

          if (newSelected.some((el) => el.id === "all")) {
            newSelected = newSelected.filter((el) => el.id !== "all");
          }

          setSelected(newSelected);
          onChange?.(newSelected);
        }

        setSelected(newSelected);
      },
      [onChange, selected]
    );

    return (
      <div>
        <Command
          onKeyDown={handleKeyDown}
          className={cn(
            "group h-10 overflow-visible rounded-md border border-input px-3 py-2 text-sm ",
            className,
            `${disabled ? "opacity-50" : null}`
          )}
          ref={inputRef}
        >
          <div className='relative flex flex-wrap items-center gap-1'>
            <div
              className='absolute -top-0.5 left-0 mt-1.5 text-muted-foreground'
              onClick={() => (!disabled ? setOpen(!open) : null)}
            >
              {loading ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : open ? (
                <ChevronsDownUp className='h-4 w-4' />
              ) : (
                <ChevronsUpDown className='h-4 w-4' />
              )}
            </div>

            <CommandPrimitive.Input
              ref={inputRef}
              onValueChange={onSearch}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={
                selected?.length
                  ? `${selected.length} مورد انتخاب شده`
                  : placeholder
              }
              className={`flex-1 cursor-pointer outline-none placeholder:text-muted-foreground ${inputClassName}`}
              disabled={disabled}
            />
          </div>

          <div className='relative mt-2'>
            {open && (
              <div className='absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
                <CommandGroup className='h-full overflow-auto'>
                  <ScrollArea className='h-72 p-0' dir='rtl'>
                    {list.map((option: any, i: number) => (
                      <div
                        key={option.id}
                        ref={i + 1 === list.length ? ref : null}
                      >
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onSelect={() => handleCheckboxChange(option)}
                          className='flex cursor-pointer items-center justify-between '
                          disabled={
                            option.id !== "all" &&
                            selected.some((option) => option.id === "all")
                          }
                        >
                          <span>{option.title}</span>
                          <input
                            type='checkbox'
                            checked={selected?.some((s) => s.id === option.id)}
                            onChange={() => handleCheckboxChange(option)}
                            className='peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
                          />
                        </CommandItem>
                      </div>
                    ))}
                    {isValidating && (
                      <div className='mt-2 flex justify-center'>
                        <Loader2 className='animate-spin' />
                      </div>
                    )}
                  </ScrollArea>
                </CommandGroup>
                {!loading && !isValidating && !list.length && (
                  <div className='p-2'>
                    <small>{emptyMessage || "No items found"}</small>
                  </div>
                )}
              </div>
            )}
          </div>
        </Command>
      </div>
    );
  }
);
MultiSelectCheckBox.displayName = "MultiSelectCheckbox";
