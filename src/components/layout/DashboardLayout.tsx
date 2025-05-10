"use client";

import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-gray-50 flex p-4 md:p-6 gap-4 md:gap-6 overflow-hidden">
      {/* Sidebar - always visible */}
      <div className="w-64 relative z-0 hidden md:block flex-shrink-0">
        <Sidebar className="h-[calc(100vh-3rem)] shadow-sm" />
      </div>
      
      {/* Mobile sidebar - simplified version */}
      <div className="block md:hidden fixed bottom-6 left-6 z-40">
        <div className="bg-gray-100 rounded-full p-3 shadow-lg">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Navbar */}
        <div className="mb-4 md:mb-6">
          <Navbar />
        </div>
        
        {/* Main content area - scrollable */}
        <main className="flex-1 h-[calc(100vh-8rem)]">
          <div className="bg-gray-100 rounded-lg shadow-sm h-full overflow-auto">
            <div className="p-4 md:p-6">
              {children || (
                <div className="grid place-items-center h-full">
                  <div className="text-gray-400">Main Content Area</div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;