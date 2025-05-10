'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { useAuth } from '@/hooks/useAuth';
import LoginForm from "@/components/auth/LoginForm";

export default function RegisterPage() {
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
        
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
