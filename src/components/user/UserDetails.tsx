'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building, 
  Globe, 
  MapPin, 
  User as UserIcon, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { UserDetailsProps } from '@/types';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { getInitials, formatPhoneNumber } from '@/utils/helpers';
import { ANIMATION } from '@/utils/constants';

/**
 * Comprehensive user details component with enhanced information display
 */
export const UserDetails: React.FC<UserDetailsProps> = ({ user, onBack }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.warn('Failed to copy to clipboard:', error);
    }
  };

  const handleWebsiteClick = () => {
    const url = user.website.startsWith('http') ? user.website : `https://${user.website}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderCopyableField = (icon: React.ReactNode, label: string, value: string, fieldName: string) => (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <div className="text-purple-400 group-hover:text-purple-300 transition-colors flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-400 font-medium">{label}</p>
          <p className="text-white truncate font-semibold">{value}</p>
        </div>
      </div>
      <button
        onClick={() => handleCopyToClipboard(value, fieldName)}
        className="ml-3 p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label={`Copy ${label}`}
      >
        {copiedField === fieldName ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Go back to user list"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Users</span>
        </button>
        <h1 className="text-3xl font-bold text-white">User Details</h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <AnimatedCard delay={ANIMATION.CARD_DELAY} className="lg:col-span-1 rounded-xl p-6">
          <div className="text-center">
            {/* Avatar */}
            <div className="relative mx-auto mb-6">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-2xl mx-auto">
                {getInitials(user.name)}
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white animate-pulse shadow-lg">
                <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>

            {/* Basic Info */}
            <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
            <p className="text-purple-300 text-lg mb-1">@{user.username}</p>
            <p className="text-gray-400 text-sm mb-6">ID: #{user.id}</p>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = `mailto:${user.email}`}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </button>
              <button
                onClick={() => window.location.href = `tel:${user.phone}`}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </button>
            </div>
          </div>
        </AnimatedCard>

        {/* Contact Information */}
        <AnimatedCard delay={ANIMATION.CARD_DELAY * 2} className="lg:col-span-2 rounded-xl p-6">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
            <UserIcon className="w-6 h-6 text-purple-400" />
            <span>Contact Information</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderCopyableField(
              <Mail className="w-5 h-5" />,
              'Email Address',
              user.email,
              'email'
            )}
            
            {renderCopyableField(
              <Phone className="w-5 h-5" />,
              'Phone Number',
              formatPhoneNumber(user.phone),
              'phone'
            )}
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="text-orange-400 group-hover:text-orange-300 transition-colors flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-400 font-medium">Website</p>
                  <p className="text-white truncate font-semibold">{user.website}</p>
                </div>
              </div>
              <button
                onClick={handleWebsiteClick}
                className="ml-3 p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Visit website"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            
            {renderCopyableField(
              <Building className="w-5 h-5" />,
              'Company',
              user.company.name,
              'company'
            )}
          </div>
        </AnimatedCard>
      </div>

      {/* Address and Company Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Address Information */}
        <AnimatedCard delay={ANIMATION.CARD_DELAY * 3} className="rounded-xl p-6">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-green-400" />
            <span>Address</span>
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-gray-400 font-medium mb-1">Street Address</p>
              <p className="text-white font-semibold">{user.address.street}</p>
              <p className="text-gray-300">{user.address.suite}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-gray-400 font-medium mb-1">City</p>
                <p className="text-white font-semibold">{user.address.city}</p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-gray-400 font-medium mb-1">ZIP Code</p>
                <p className="text-white font-semibold">{user.address.zipcode}</p>
              </div>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-gray-400 font-medium mb-1">Coordinates</p>
              <p className="text-white font-semibold">
                Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
              </p>
            </div>
          </div>
        </AnimatedCard>

        {/* Company Information */}
        <AnimatedCard delay={ANIMATION.CARD_DELAY * 4} className="rounded-xl p-6">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
            <Building className="w-6 h-6 text-blue-400" />
            <span>Company</span>
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-gray-400 font-medium mb-1">Company Name</p>
              <p className="text-white font-semibold text-lg">{user.company.name}</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-gray-400 font-medium mb-1">Slogan</p>
              <p className="text-white font-semibold italic">&ldquo;{user.company.catchPhrase}&ldquo;</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-gray-400 font-medium mb-1">Business</p>
              <p className="text-white">{user.company.bs}</p>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Copy Success Toast */}
      {copiedField && (
        <div className="fixed bottom-4 right-4 z-50">
          <AnimatedCard className="bg-green-600 border-green-500 px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-2 text-white">
              <Check className="w-4 h-4" />
              <span className="font-medium">Copied to clipboard!</span>
            </div>
          </AnimatedCard>
        </div>
      )}
    </div>
  );
};