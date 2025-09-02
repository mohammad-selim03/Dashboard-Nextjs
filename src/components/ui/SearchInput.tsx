'use client';

import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { SearchProps } from '@/types';

/**
 * Enhanced search input component with clear functionality
 */
export const SearchInput: React.FC<SearchProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search..." 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  // Focus on mount (optional)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative max-w-md mx-auto group">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
        
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full pl-12 pr-12 py-3 
            bg-white/10 border border-white/20 rounded-lg 
            text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
            transition-all duration-300
            hover:bg-white/15
            group
          "
        />
        
        {value && (
          <button
            onClick={handleClear}
            className="
              absolute right-4 top-1/2 transform -translate-y-1/2 
              text-gray-400 hover:text-white transition-colors
              focus:outline-none focus:ring-2 focus:ring-purple-500 rounded
            "
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Keyboard shortcut hint */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
        {!value && (
          <span className="hidden sm:block bg-gray-700 px-2 py-1 rounded text-xs">
            Ctrl+K
          </span>
        )}
      </div>
    </div>
  );
};