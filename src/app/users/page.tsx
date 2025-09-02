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
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { PAGINATION } from '@/utils/constants';

/**
 * Users dashboard page with comprehensive user management functionality
 */
export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Fetch users data
  const { users, loading, error, refetch } = useUsers();
  
  // Search functionality
  const { searchTerm, setSearchTerm, filteredUsers, clearSearch } = useSearch(users);
  
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

            {/* Search and Stats */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
              <div className="flex-1 max-w-md mx-auto lg:mx-0">
                <SearchInput
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search users by name, email, or company..."
                />
              </div>
              
              <div className="text-center lg:text-right">
                <p className="text-gray-300">
                  Showing <span className="font-semibold text-white">{paginatedUsers.length}</span> of{' '}
                  <span className="font-semibold text-white">{filteredUsers.length}</span> users
                  {searchTerm && (
                    <span className="ml-2">
                      for "<span className="text-purple-300">{searchTerm}</span>"
                      <button
                        onClick={clearSearch}
                        className="ml-2 text-purple-400 hover:text-purple-300 underline focus:outline-none"
                      >
                        Clear
                      </button>
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Users Grid */}
            <UserGrid
              users={paginatedUsers}
              onUserClick={handleUserClick}
              loading={loading}
            />

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