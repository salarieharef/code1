export interface SearchFilterProps {
    className?: string;
    searchPlaceholder?: string;
    sort?: string;
    setSort?: (value: string) => void;
    onSearchQueryChange?: (query: string) => void;
    onToggleFilters?: () => void;
    disableSort?: boolean;
    paramQuery?: string;
  }
  