import { User } from './user';

export type { 
  User, 
  Address, 
  Company, 
  UserCardProps, 
  UserDetailsProps, 
  PaginationProps, 
  SearchProps 
} from './user';

export interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

export interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface UseSearchReturn<T = unknown> {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredData: T[];
  clearSearch: () => void;
  debouncedSearchTerm: string;
}

// Search types
export type SearchType = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredUsers: User[];
  clearSearch: () => void;
  debouncedSearchTerm: string;
  searchStats: {
    totalResults: number;
    searchTime: number;
    cacheHit: boolean;
  };
  isSearching: boolean;
};

// Search fields type
export type SearchFields = {
  name: boolean;
  email: boolean;
};

// Optimized search type
export type OptimizedSearchType = SearchType & {
  searchFields: SearchFields;
  setSearchFields: (fields: { name?: boolean; email?: boolean }) => void;
};
