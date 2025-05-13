import { redirect } from 'next/navigation';
import { isUserAuthenticated } from '@/lib/firebase/firebase-admin';
import DashboardLayout from "@/components/layout/DashboardLayout";

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Server-side authentication check
  const isAuthenticated = await isUserAuthenticated();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    redirect('/login');
  }

  // If authenticated, show the dashboard
  return (
    <DashboardLayout />
  );
}
