"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { VscDashboard } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { PiHandCoinsThin } from "react-icons/pi";


interface SidebarProps {
  className?: string;
}

// Dashboard routes
const routes = [
  {
    title: "Dashboard",
    href: "/",
    icon: VscDashboard,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: CiBoxList,
  },
  {
    title: "New Order",
    href: "/new-order",
    icon: CiCirclePlus,
  },
  {
    title: "Add Funds",
    href: "/add-funds",
    icon: PiHandCoinsThin,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();
  
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
              
              return (
                <Link 
                  key={route.href} 
                  href={route.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <route.icon size={18} className={isActive ? 'text-primary' : 'text-gray-500'} />
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