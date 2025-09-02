'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { PaginationProps } from '@/types';
import { AnimatedCard } from './AnimatedCard';

/**
 * Advanced pagination component with first/last navigation
 */
export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems 
}) => {
  if (totalPages <= 1) return null;

  // Generate page numbers array
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Calculate range
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Add first page
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // Add main range
    rangeWithDots.push(...range);

    // Add last page
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <AnimatedCard delay={600} className="rounded-xl p-6">
      <div className="flex flex-col items-center space-y-4">
        {/* Navigation buttons */}
        <div className="flex items-center space-x-2">
          {/* First page */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="
              flex items-center space-x-1 px-3 py-2 
              bg-purple-600/20 text-white rounded-lg 
              hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed 
              transition-colors duration-200
              hidden sm:flex
            "
            aria-label="Go to first page"
          >
            <ChevronsLeft className="w-4 h-4" />
            <span className="hidden md:block">First</span>
          </button>

          {/* Previous page */}
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="
              flex items-center space-x-2 px-4 py-2 
              bg-purple-600/20 text-white rounded-lg 
              hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed 
              transition-colors duration-200
            "
            aria-label="Go to previous page"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Page numbers */}
          <div className="flex space-x-2">
            {pageNumbers.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-gray-400">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(Number(page))}
                    className={`
                      w-10 h-10 rounded-lg font-medium transition-all duration-200
                      ${currentPage === page
                        ? 'bg-purple-600 text-white shadow-lg scale-110'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                      }
                    `}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next page */}
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="
              flex items-center space-x-2 px-4 py-2 
              bg-purple-600/20 text-white rounded-lg 
              hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed 
              transition-colors duration-200
            "
            aria-label="Go to next page"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Last page */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="
              flex items-center space-x-1 px-3 py-2 
              bg-purple-600/20 text-white rounded-lg 
              hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed 
              transition-colors duration-200
              hidden sm:flex
            "
            aria-label="Go to last page"
          >
            <span className="hidden md:block">Last</span>
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>

        {/* Page info */}
        <div className="text-center text-gray-400 text-sm">
          Page {currentPage} of {totalPages} • {totalItems} users total
        </div>
      </div>
    </AnimatedCard>
  );
};