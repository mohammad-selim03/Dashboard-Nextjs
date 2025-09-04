'use client';

import React, { useState } from 'react';
import { Mail, Phone, Building, Globe } from 'lucide-react';
import { UserCardProps } from '@/types';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { getInitials, formatPhoneNumber } from '@/utils/helpers';
import Image from 'next/image';
import { ImageProvider } from '@/assets';

/**
 * Individual user card component with hover animations
 */
export const UserCard: React.FC<UserCardProps> = ({ user, onClick, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedCard delay={delay} className="rounded-xl p-6 cursor-pointer hover:shadow-2xl">
      <div
        className={`transition-all duration-300 transform ${isHovered ? 'scale-105' : 'scale-100'
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick();
          }
        }}
        aria-label={`View details for ${user.name}`}
      >
        {/* User Avatar and Basic Info */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            {/* <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {getInitials(user.name)}
            </div> */}
            <Image src={ImageProvider?.defaultUser} alt='User Avatar' height={72} width={72} className='rounded-full object-cover' />
            {/* Online status indicator */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-lg">
              <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-white mb-1 hover:text-purple-300 transition-colors truncate">
              {user.name}
            </h3>
            <p className="text-gray-400 text-sm truncate">@{user.username}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-3 text-gray-300 group">
            <Mail className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors flex-shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-300 group">
            <Phone className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors flex-shrink-0" />
            <span className="truncate">{formatPhoneNumber(user.phone)}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-300 group">
            <Building className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-colors flex-shrink-0" />
            <span className="truncate">{user.company.name}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-300 group">
            <Globe className="w-4 h-4 text-orange-400 group-hover:text-orange-300 transition-colors flex-shrink-0" />
            <span className="truncate">{user.website}</span>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        />
      </div>
    </AnimatedCard>
  );
};