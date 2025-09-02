'use client';

import React from 'react';
import { User } from '@/types';
import { UserCard } from './UserCard';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { ANIMATION } from '@/utils/constants';

interface UserGridProps {
  users: User[];
  onUserClick: (user: User) => void;
  loading?: boolean;
}

/**
 * Grid layout component for displaying user cards
 */
export const UserGrid: React.FC<UserGridProps> = ({ 
  users, 
  onUserClick, 
  loading = false 
}) => {
  // Show loading skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-md border border-white/10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
              <div className="space-y-3">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Show empty state
  if (users.length === 0) {
    return (
      <AnimatedCard className="rounded-xl p-12 text-center">
        <div className="text-6xl mb-4 opacity-50">🔍</div>
        <h3 className="text-2xl font-semibold text-white mb-2">No users found</h3>
        <p className="text-gray-400 mb-4">
          Try adjusting your search terms or check back later
        </p>
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </AnimatedCard>
    );
  }

  // Show user cards grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {users.map((user, index) => (
        <UserCard
          key={user.id}
          user={user}
          onClick={() => onUserClick(user)}
          delay={index * ANIMATION.CARD_DELAY}
        />
      ))}
    </div>
  );
};