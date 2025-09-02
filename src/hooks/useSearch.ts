'use client';

import { useState, useEffect, useMemo } from 'react';
import { User, UseSearchReturn } from '@/types';
import { filterUsers, debounce } from '@/utils/helpers'; 
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { useLocalStorage } from './useLocalStorage';

interface UserSearchReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredUsers: User[];
  clearSearch: () => void;
  debouncedSearchTerm: string;
}

/**
 * Custom hook for search functionality with debouncing and local storage
 */
export const useSearch = (users: User[]): UserSearchReturn => {
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage(
    LOCAL_STORAGE_KEYS.SEARCH_TERM,
    ''
  );
  
  const [searchTerm, setSearchTerm] = useState(storedSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((term: string) => {
      setDebouncedSearchTerm(term);
    }, 300),
    []
  );

  // Update debounced search term when search term changes
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // Save search term to local storage
  useEffect(() => {
    setStoredSearchTerm(searchTerm);
  }, [searchTerm, setStoredSearchTerm]);

  // Filter users based on debounced search term
  const filteredUsers = useMemo(() => {
    return filterUsers(users, debouncedSearchTerm);
  }, [users, debouncedSearchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredUsers,
    clearSearch,
    debouncedSearchTerm,
  };
};