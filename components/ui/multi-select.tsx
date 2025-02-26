"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronsDownUp, ChevronsUpDown, Loader2, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { useIntersection } from "@mantine/hooks";

// Util imports
import some from "lodash-es/some";
import { ScrollArea } from "./scroll-area";

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
  maxSelection?: number;
  children?: any;
}
export const MultiSelect = forwardRef<React.ElementRef<"a">, MultiSelectProps>(
  ({
    list,
    placeholder,
    onChange,
    className,
    onSearch,
    isValidating,
    loading,
    disabled,
    defaultValue,
    setSize,
    size,
    page_number,
    maxSelection,
    children,
    ...props
  }: any) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Option[]>(defaultValue || []);
    const [isMaxSelected, setIsMaxSelected] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setSelected(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
      if (maxSelection) {
        setIsMaxSelected(selected.length >= maxSelection);
      }
    }, [selected, maxSelection]);

    const handleUnselect = useCallback(
      (option: Option) => {
        setSelected((prev) => {
          const newSelected = prev.filter((s) => s.id !== option.id);
          onChange(newSelected); // Call onChange with the updated state
          return newSelected;
        });
      },
      [onChange]
    );

    const handleSelect = (option: Option) => {
      if (selected.some((item) => item.id === option.id)) {
        handleUnselect(option);
      } else if (!isMaxSelected) {
        setSelected((prev) => {
          const newSelected = [...prev, option];
          onChange(newSelected); // Call onChange with the updated state
          return newSelected;
        });
      }
    };

    const handleKeyDown = useCallback(
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

    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      },
      [dropdownRef]
    );

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside]);

    const selectable = list?.filter((option: any) => !some(selected, option));

    const lastClass = useRef<HTMLElement>(null);
    const { ref, entry } = useIntersection({
      root: lastClass.current,
      threshold: 1,
    });

    useEffect(() => {
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

    return (
      <div>
        <Command
          onKeyDown={handleKeyDown}
          className='overflow-visible bg-transparent'
        >
          <div
            className={cn(
              "group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
              className,
              `${disabled ? "opacity-50" : null}`
            )}
          >
            <div className='relative flex flex-wrap gap-1'>
              {selected?.length
                ? selected?.map((option) => {
                    return (
                      <Badge
                        key={option.id}
                        variant='secondary'
                        className='border border-border'
                      >
                        <span className='mt-[2px] leading-5'>
                          {option.title}
                        </span>
                        <button
                          className='mr-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUnselect(option);
                            }
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onClick={() => handleUnselect(option)}
                        >
                          <X className='mr-1 h-3 w-3 text-muted-foreground hover:text-foreground' />
                        </button>
                      </Badge>
                    );
                  })
                : null}

              <CommandPrimitive.Input
                ref={inputRef}
                onValueChange={onSearch}
                onBlur={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                placeholder={placeholder}
                className='flex-1 bg-transparent outline-none placeholder:text-muted-foreground'
                disabled={disabled || isMaxSelected} // Disable input if max selection reached
                title={
                  isMaxSelected
                    ? `امکان انتخاب بیش از ${maxSelection} گزینه وجود ندارد`
                    : ""
                }
              />

              <div
                className='absolute left-0 top-0 mt-1.5 text-muted-foreground'
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
            </div>
          </div>
          <div
            className={`relative mt-2 ${disabled || maxSelection ? "cursor-not-allowed" : ""}`}
            ref={dropdownRef}
          >
            {open ? (
              <div className='absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
                <CommandGroup className='h-full overflow-auto'>
                  <ScrollArea
                    className='h-72 p-0'
                    dir='rtl'
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {selectable?.map((option: any, i: number) => {
                      if (i + 1 === selectable?.length) {
                        return (
                          <CommandItem
                            ref={ref}
                            key={i}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onSelect={() => handleSelect(option)}
                            className={"cursor-pointer"}
                            disabled={isMaxSelected} // Disable option if max selection reached
                          >
                            {option.title}
                          </CommandItem>
                        );
                      }

                      return (
                        <CommandItem
                          key={option.id}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onSelect={() => handleSelect(option)}
                          className={"cursor-pointer"}
                          disabled={isMaxSelected} // Disable option if max selection reached
                        >
                          {option.title}
                        </CommandItem>
                      );
                    })}

                    {isValidating ? (
                      <div className='mt-2 flex justify-center'>
                        <Loader2 className='animate-spin' />
                      </div>
                    ) : null}
                    {children}
                  </ScrollArea>
                </CommandGroup>
                {!loading && !isValidating && !selectable?.length ? (
                  <div className='p-2'>
                    <small>دسته بندی مورد نظر شما یافت نشد.</small>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </Command>
      </div>
    );
  }
);
MultiSelect.displayName = "MultiSelect";
