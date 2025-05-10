"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiLogOut, FiSettings, FiSearch, FiMenu } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/components/ClientUserProvider';
import { useAuth } from '@/hooks/useAuth';
import SearchCommand from '@/components/ui/SearchCommand';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { user, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Only show client-side components after mounting to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <header className={`h-16 rounded-lg shadow-sm p-2 sm:p-4 flex items-center justify-between ${className}`}>
      {/* Logo */}
      <div className="flex items-center gap-2">
      <Badge variant="outline">Balance: $0</Badge>
      <Badge variant="outline">Total Orders: 0</Badge>
      </div>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <FiMenu size={24} />
      </button>
      
      {/* Navigation links - desktop */}
      <div className="hidden md:flex items-center gap-6">
        {/* Search */}
        <SearchCommand />
        
        {/* User controls */}
        {mounted && user && (
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-9 w-9 border-2 border-white shadow-sm hover:ring-2 hover:ring-primary/20 transition">
                  <AvatarImage src={user.photoURL || undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Signed in as</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || undefined} />
                        <AvatarFallback className="text-xs">
                          {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
                        <p className="text-xs text-muted-foreground leading-none mt-1">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/settings">
                    <DropdownMenuItem>
                      <FiSettings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <FiLogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            {/* Mobile menu header */}
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" className="cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/images/realvirally-logo-black.png"
                  alt="RealViraly Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <button 
                className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Mobile menu content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {/* Search in mobile menu */}
                <div className="w-full">
                  <SearchCommand 
                    className="w-full" 
                  />
                </div>
                
                {/* Navigation links */}
                <nav className="space-y-1">
                  <Link 
                    href="/"
                    className="block px-4 py-3 rounded-md hover:bg-gray-100 text-gray-900 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/orders"
                    className="block px-4 py-3 rounded-md hover:bg-gray-100 text-gray-900 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link 
                    href="/new-order"
                    className="block px-4 py-3 rounded-md hover:bg-gray-100 text-gray-900 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    New Order
                  </Link>
                  <Link 
                    href="/add-funds"
                    className="block px-4 py-3 rounded-md hover:bg-gray-100 text-gray-900 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Add Funds
                  </Link>
                </nav>
              </div>
            </div>
            
            {/* Mobile menu footer with user info */}
            {mounted && user && (
              <div className="border-t p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarImage src={user.photoURL || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {user.displayName || user.email || 'User'}
                      </span>
                      {user.email && (
                        <span className="text-xs text-gray-500 truncate max-w-[180px]">
                          {user.email}
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer flex items-center justify-center" 
                    onClick={() => signOut()}
                    aria-label="Sign out"
                  >
                    <FiLogOut size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

