'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/firebase/auth';

// Define the User type
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Define the auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  refreshUser: async () => {},
});

export function ClientUserProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [loading, setLoading] = useState(!initialUser);
  const router = useRouter();

  // Function to refresh user data from the server
  const refreshUser = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const userData = await res.json();
        if (userData.success && userData.data) {
          setUser(userData.data);
        }
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh user data when there is no initial user but we're on a protected route
  // This helps with the post-login state when there's a redirect without a full page refresh
  useEffect(() => {
    if (!initialUser && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
      refreshUser();
    }
  }, [initialUser]);

  // Handle sign out
  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      setUser(null);
      router.push('/login');
      router.refresh();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut: handleSignOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
} 