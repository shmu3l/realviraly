"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LottieIcon from '@/components/ui/LottieIcon';
// Import Lottie animations directly from JSON files
import dashboardAnimation from '@/components/ui/lottie-icons/dashboard.json';
import ordersAnimation from '@/components/ui/lottie-icons/orders.json';
import newOrderAnimation from '@/components/ui/lottie-icons/new-order.json';
import addFundsAnimation from '@/components/ui/lottie-icons/add-funds.json';

interface SidebarProps {
  className?: string;
}

// Dashboard routes with Lottie animations
const routes = [
  {
    title: "Dashboard",
    href: "/",
    animation: dashboardAnimation,
  },
  {
    title: "Orders",
    href: "/orders",
    animation: ordersAnimation,
  },
  {
    title: "New Order",
    href: "/new-order",
    animation: newOrderAnimation,
  },
  {
    title: "Add Funds",
    href: "/add-funds",
    animation: addFundsAnimation,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  
  return (
    <aside className={`bg-white rounded-lg shadow-sm ${className}`}>
      {/* Header/Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            RV
          </div>
          <span className="font-semibold text-lg">RealViraly</span>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex flex-col h-[calc(100%-64px)] overflow-y-auto">
        {/* Main Navigation */}
        <div className="p-3">
          <nav className="space-y-1">
            {routes.map((route) => {
              const isActive = pathname === route.href || 
                (route.href !== '/' && pathname.startsWith(route.href));
              const isHovered = hoveredRoute === route.href;
              
              return (
                <Link 
                  key={route.href} 
                  href={route.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                  onMouseEnter={() => setHoveredRoute(route.href)}
                  onMouseLeave={() => setHoveredRoute(null)}
                >
                  <LottieIcon 
                    animationData={route.animation} 
                    size={20} 
                    className={isActive ? 'text-primary' : 'text-gray-500'}
                    isHovered={isHovered}
                  />
                  <span>{route.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;