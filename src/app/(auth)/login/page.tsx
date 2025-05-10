'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <Image
              src="/images/realvirally-logo-black.png"
              alt="RealViraly Logo"
              width={180}
              height={60}
              className="object-contain"
            />
          </Link>
        </div>
        
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
