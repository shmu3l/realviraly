"use client";

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/useAuthStore';

export function AuthStoreInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const { setUser, setLoading } = useAuthStore.getState();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      useAuthStore.setState({ initialized: true });
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
} 