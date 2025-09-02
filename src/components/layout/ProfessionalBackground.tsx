'use client';

import React from 'react';

/**
 * Professional background component for business applications
 * Uses CSS-only subtle gradient patterns instead of distracting 3D animations
 */
export const ProfessionalBackground: React.FC = () => {
  return (
    <>
      {/* Main gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Subtle overlay patterns */}
      <div className="fixed inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-6" />
      </div>
      
      {/* Professional grid pattern */}
      <div className="fixed inset-0 opacity-[0.02] bg-professional-grid" />
      
      {/* Subtle corner highlights */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-radial from-blue-500/5 via-transparent to-transparent" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-radial from-purple-500/5 via-transparent to-transparent" />
      
      {/* Professional accent lines */}
      <div className="fixed top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600/30 to-transparent" />
      <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600/30 to-transparent" />
      
      {/* Subtle brand accents */}
      <div className="fixed top-1/4 right-0 w-px h-32 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
      <div className="fixed bottom-1/4 left-0 w-px h-32 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
    </>
  );
};