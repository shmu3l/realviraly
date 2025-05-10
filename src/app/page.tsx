
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';

import DashboardLayout from "@/components/layout/DashboardLayout";


export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // If still loading or not logged in, show nothing (will redirect)
  if (loading || !user) {
    return null;
  }

  return (
    <DashboardLayout />
  );
}
