"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiLogOut, FiSettings, FiSearch, FiLogIn } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@/components/ui/command';
import { useAuth } from '@/hooks/useAuth';

// Note: If react-icons package is installed, you can use these icons instead:
// import { FiLogOut, FiSettings, FiSearch, FiLogIn } from 'react-icons/fi';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only show client-side components after mounting to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mx-4 my-4">
      <div 
        className="flex items-center justify-between px-6 py-2"
        style={{
          WebkitBackdropFilter: "blur(40px)",
          backdropFilter: "blur(40px)",
          background: "rgba(41, 41, 41, 0.5)",
          borderRadius: "8px"
        }}
      >
        <div className="flex items-center">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/realviraly-white.png"
              alt="RealViraly Logo"
              width={100}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>
        
        {mounted && (
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setOpen(true)}
              className="relative w-[150px] h-8 px-3 flex items-center justify-start rounded-lg bg-gray-700/40 border border-gray-600/50 text-gray-300 text-sm cursor-pointer hover:bg-gray-700/60"
            >
              <FiSearch className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
              <span className="truncate">Search...</span>
            </button>
            
            {user && (
              <>
                <button 
                  className="text-white hover:text-gray-300 transition-colors cursor-pointer flex items-center justify-center" 
                  aria-label="Settings"
                >
                  <FiSettings size={20} />
                </button>
                
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.photoURL || undefined} />
                  <AvatarFallback>
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <button 
                  className="text-white hover:text-gray-300 transition-colors cursor-pointer flex items-center justify-center" 
                  onClick={() => signOut()}
                  aria-label="Sign out"
                >
                  <FiLogOut size={20} />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem>
              <Link href="/" className="flex w-full">Home</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/dashboard" className="flex w-full">Dashboard</Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </nav>
  );
}
