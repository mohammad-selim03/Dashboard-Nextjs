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
}