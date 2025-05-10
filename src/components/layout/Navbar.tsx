"use client";

import React from 'react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <header className={`h-16 bg-gray-100 rounded-lg p-4 flex items-center justify-between ${className}`}>
      {/* Logo or title for mobile */}
      <div className="md:hidden font-bold">
        RealViraly
      </div>
      
      {/* Search placeholder */}
      <div className="flex-1 max-w-md mx-4">
        <div className="h-10 bg-gray-200 rounded-md w-full"></div>
      </div>
      
      {/* User profile placeholder */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
      </div>
    </header>
  );
};

export default Navbar;