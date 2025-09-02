'use client';

import React, { useState } from 'react';
import { Clock, Zap, Database, TrendingUp } from 'lucide-react';
import { UserService } from '@/services/userServices';

interface SearchPerformanceProps {
  searchStats: {
    totalResults: number;
    searchTime: number;
    cacheHit: boolean;
  };
  totalUsers: number;
  isVisible?: boolean;
}

/**
 * Component to display search performance metrics and cache information
 */
export const SearchPerformance: React.FC<SearchPerformanceProps> = ({
  searchStats,
  totalUsers,
  isVisible = false
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [cacheInfo, setCacheInfo] = useState(UserService.getCacheInfo());

  React.useEffect(() => {
    // Update cache info periodically
    const interval = setInterval(() => {
      setCacheInfo(UserService.getCacheInfo());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const getPerformanceColor = (time: number) => {
    if (time < 1) return 'text-green-400';
    if (time < 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-white/5 rounded-lg border border-white/10 p-4 mt-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Search Performance
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">Speed</span>
          </div>
          <div className={`text-sm font-semibold ${getPerformanceColor(searchStats.searchTime)}`}>
            {searchStats.searchTime}ms
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Database className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">Cache</span>
          </div>
          <div className={`text-sm font-semibold ${
            searchStats.cacheHit ? 'text-green-400' : 'text-blue-400'
          }`}>
            {searchStats.cacheHit ? 'Hit' : 'Miss'}
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Zap className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">Results</span>
          </div>
          <div className="text-sm font-semibold text-white">
            {searchStats.totalResults}
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">Ratio</span>
          </div>
          <div className="text-sm font-semibold text-purple-400">
            {totalUsers > 0 ? Math.round((searchStats.totalResults / totalUsers) * 100) : 0}%
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <h4 className="text-white font-medium mb-2">Cache Status</h4>
              <div className="space-y-1 text-gray-300">
                <div>Status: <span className={cacheInfo.cached ? 'text-green-400' : 'text-yellow-400'}>
                  {cacheInfo.cached ? 'Active' : 'Empty'}
                </span></div>
                {cacheInfo.cached && (
                  <>
                    <div>Users: {cacheInfo.users}</div>
                    <div>Age: {cacheInfo.age}s</div>
                    <div>Remaining: {cacheInfo.remainingTime}s</div>
                  </>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Optimizations</h4>
              <div className="space-y-1 text-gray-300">
                <div>✓ Search indexing</div>
                <div>✓ Result caching</div>
                <div>✓ Request deduplication</div>
                <div>✓ Debounced input</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};