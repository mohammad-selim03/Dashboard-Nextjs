'use client';

import React, { useState } from 'react';
import { User } from '@/types';
import { UserGrid } from '@/components/user/UserGrid';
import { UserDetails } from '@/components/user/UserDetails';
import { SearchInput } from '@/components/ui/SearchInput';
import { Pagination } from '@/components/ui/Pagination';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ProfessionalBackground } from '@/components/layout/ProfessionalBackground';
import { useUsers } from '@/hooks/userUsers';
import { useOptimizedSearch } from '@/hooks/useOptimizedSearch';
import { usePagination } from '@/hooks/usePagination';
import { PAGINATION } from '@/utils/constants';

// Filter options enum
export enum FilterType {
  ALL = 'all',
  NAME = 'name',
  EMAIL = 'email',
  COMPANY = 'company'
}

/**
 * Users dashboard page with comprehensive user management functionality
 */
export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.ALL);

  // Fetch users data
  const { users, loading, error, refetch } = useUsers();

  // Enhanced search functionality with filter support
  const {
    searchTerm,
    setSearchTerm,
    filteredUsers: searchFilteredUsers,
    clearSearch,
    searchStats,
    isSearching
  } = useOptimizedSearch(users);

  // Apply additional filtering based on selected filter type
  const filteredUsers = React.useMemo(() => {
    if (!searchTerm || activeFilter === FilterType.ALL) {
      return searchFilteredUsers;
    }

    return searchFilteredUsers.filter((user: User) => {
      const searchLower = searchTerm.toLowerCase();
      
      switch (activeFilter) {
        case FilterType.NAME:
          return user.name.toLowerCase().includes(searchLower);
        case FilterType.EMAIL:
          return user.email.toLowerCase().includes(searchLower);
        case FilterType.COMPANY:
          return user.company?.name?.toLowerCase().includes(searchLower) || false;
        default:
          return true;
      }
    });
  }, [searchFilteredUsers, searchTerm, activeFilter]);

  // Pagination functionality
  const pagination = usePagination({
    totalItems: filteredUsers.length,
    itemsPerPage: PAGINATION.USERS_PER_PAGE,
    resetOnItemsChange: true,
  });

  const paginatedUsers = pagination.paginatedItems(filteredUsers);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
  };

  const handleFilterChange = (filterType: FilterType) => {
    setActiveFilter(filterType);
  };

  const clearAllFilters = () => {
    clearSearch();
    setActiveFilter(FilterType.ALL);
  };

  // Filter button component
  const FilterButton = ({ 
    type, 
    label, 
    count 
  }: { 
    type: FilterType; 
    label: string; 
    count?: number;
  }) => (
    <button
      onClick={() => handleFilterChange(type)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
        activeFilter === type
          ? 'bg-purple-600 text-white shadow-lg'
          : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
      }`}
    >
      {label}
      {count !== undefined && (
        <span className="ml-2 px-2 py-1 bg-black/20 rounded-full text-xs">
          {count}
        </span>
      )}
    </button>
  );

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Professional background */}
      <ProfessionalBackground />

      {/* Main content */}
      <div className="relative z-10">
        {selectedUser ? (
          // User details view
          <UserDetails user={selectedUser} onBack={handleBackToList} />
        ) : (
          // User list view
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                User Dashboard
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Discover and connect with users in our community. Search, filter, and explore detailed profiles.
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="mb-8 space-y-6">
              {/* Search Input */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 max-w-md mx-auto lg:mx-0">
                  <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder={`Search users ${activeFilter !== FilterType.ALL ? `by ${activeFilter}` : 'by name, email, or company'}...`}
                  />
                </div>

                <div className="text-center lg:text-right">
                  <p className="text-gray-300">
                    Showing <span className="font-semibold text-white">{paginatedUsers.length}</span> of{' '}
                    <span className="font-semibold text-white">{filteredUsers.length}</span> users
                    {(searchTerm || activeFilter !== FilterType.ALL) && (
                      <button
                        onClick={clearAllFilters}
                        className="ml-2 text-purple-400 hover:text-purple-300 underline focus:outline-none text-sm"
                      >
                        Clear all filters
                      </button>
                    )}
                  </p>
                  {/* Search performance stats */}
                  {searchTerm && (
                    <p className="text-xs text-gray-500 mt-1">
                      {isSearching ? (
                        <span className="text-yellow-400">Searching...</span>
                      ) : (
                        <span>
                          Found in {searchStats.searchTime}ms
                          {searchStats.cacheHit && (
                            <span className="text-green-400 ml-1">(cached)</span>
                          )}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <FilterButton 
                  type={FilterType.ALL} 
                  label="All Users" 
                  count={users.length}
                />
                <FilterButton 
                  type={FilterType.NAME} 
                  label="Filter by Name"
                />
                <FilterButton 
                  type={FilterType.EMAIL} 
                  label="Filter by Email"
                />
                <FilterButton 
                  type={FilterType.COMPANY} 
                  label="Filter by Company"
                />
              </div>

              {/* Active Filter Indicator */}
              {(searchTerm && activeFilter !== FilterType.ALL) && (
                <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-300">
                        Filtering by <span className="text-purple-300 font-medium">{activeFilter}</span> 
                        {searchTerm && (
                          <>
                            {' '}for &ldquo;<span className="text-white font-medium">{searchTerm}</span>&rdquo;
                          </>
                        )}
                      </span>
                    </div>
                    <button
                      onClick={clearAllFilters}
                      className="text-purple-400 hover:text-purple-300 text-sm underline focus:outline-none"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* No Results Message */}
            {!loading && filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  No users found
                  {searchTerm && (
                    <> matching &ldquo;<span className="text-purple-300">{searchTerm}</span>&rdquo;</>
                  )}
                  {activeFilter !== FilterType.ALL && (
                    <> in <span className="text-purple-300">{activeFilter}</span> filter</>
                  )}
                </div>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Users Grid */}
            {!loading && filteredUsers.length > 0 && (
              <UserGrid
                users={paginatedUsers}
                onUserClick={handleUserClick}
                loading={loading}
              />
            )}

            {/* Pagination */}
            {!loading && filteredUsers.length > PAGINATION.USERS_PER_PAGE && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={pagination.goToPage}
                  totalItems={filteredUsers.length}
                />
              </div>
            )}

            {/* Loading Spinner */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}