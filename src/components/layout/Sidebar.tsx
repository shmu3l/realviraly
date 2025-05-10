"use client";

import React from 'react';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside className={`w-64 h-full bg-gray-100 rounded-lg p-4 md:p-6 ${className}`}>
      {/* Sidebar content placeholder */}
      <div className="flex items-center justify-center h-12 mb-6 border-b border-gray-200">
        <div className="font-bold">Logo</div>
      </div>
      
      {/* Menu items placeholder */}
      <div className="space-y-2">
        <div className="h-10 bg-gray-200 rounded-md"></div>
        <div className="h-10 bg-gray-200 rounded-md"></div>
        <div className="h-10 bg-gray-200 rounded-md"></div>
        <div className="h-10 bg-gray-200 rounded-md"></div>
      </div>
    </aside>
  );
};

export default Sidebar;