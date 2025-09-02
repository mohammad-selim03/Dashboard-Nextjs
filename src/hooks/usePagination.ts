'use client';

import { useState, useEffect, useMemo } from 'react';
import { getPaginationData } from '@/utils/helpers'; 
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { useLocalStorage } from './useLocalStorage';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  resetOnItemsChange?: boolean;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  paginatedItems: <T>(items: T[]) => T[];
  goToPage: (page: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  startIndex: number;
  endIndex: number;
  itemsOnCurrentPage: number;
}

/**
 * Custom hook for pagination functionality with local storage
 */
export const usePagination = ({
  totalItems,
  itemsPerPage,
  resetOnItemsChange = true,
}: UsePaginationProps): UsePaginationReturn => {
  const [storedPage, setStoredPage] = useLocalStorage(
    LOCAL_STORAGE_KEYS.CURRENT_PAGE,
    1
  );
  
  const [currentPage, setCurrentPage] = useState(storedPage);

  // Reset to first page when total items change (e.g., after filtering)
  useEffect(() => {
    if (resetOnItemsChange && currentPage > 1) {
      const maxPage = Math.ceil(totalItems / itemsPerPage);
      if (currentPage > maxPage) {
        setCurrentPage(1);
      }
    }
  }, [totalItems, itemsPerPage, currentPage, resetOnItemsChange]);

  // Save current page to local storage
  useEffect(() => {
    setStoredPage(currentPage);
  }, [currentPage, setStoredPage]);

  // Calculate pagination data
  const paginationData = useMemo(() => {
    return getPaginationData(totalItems, currentPage, itemsPerPage);
  }, [totalItems, currentPage, itemsPerPage]);

  const { 
    totalPages, 
    startIndex, 
    endIndex, 
    hasNext, 
    hasPrevious, 
    itemsOnCurrentPage 
  } = paginationData;

  // Navigation functions
  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const goToNext = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevious = () => {
    if (hasPrevious) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirst = () => {
    setCurrentPage(1);
  };

  const goToLast = () => {
    setCurrentPage(totalPages);
  };

  // Function to paginate items
  const paginatedItems = <T>(items: T[]): T[] => {
    return items.slice(startIndex, endIndex);
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    goToNext,
    goToPrevious,
    goToFirst,
    goToLast,
    hasNext,
    hasPrevious,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
  };
};