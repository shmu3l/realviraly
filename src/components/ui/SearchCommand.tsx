"use client";

import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { 
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@/components/ui/command';

interface SearchCommandProps {
  className?: string;
}

const SearchCommand: React.FC<SearchCommandProps> = ({ className }) => {
  const [open, setOpen] = useState(false);

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
    <div className={`relative max-w-md ${className}`}>
      <button 
        onClick={() => setOpen(true)}
        className="h-10 px-4 flex items-center justify-start rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm cursor-pointer transition-colors w-[180px] lg:w-[220px]"
      >
        <FiSearch className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
        <span className="truncate">Search...</span>
        <span className="hidden lg:inline ml-2 text-xs text-gray-500">⌘K</span>
      </button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Main Routes">
            <CommandItem>
              <Link href="/" className="flex w-full">Dashboard</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/orders" className="flex w-full">Orders</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/new-order" className="flex w-full">New Order</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/add-funds" className="flex w-full">Add Funds</Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchCommand;
