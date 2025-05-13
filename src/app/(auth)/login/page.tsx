import { redirect } from 'next/navigation';
import { isUserAuthenticated } from '@/lib/firebase/firebase-admin';
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams: Promise<{ from?: string }>;
}

export default async function LoginPage({
  searchParams,
}: PageProps) {
  // Server-side authentication check
  const isAuthenticated = await isUserAuthenticated();
  
  // If already authenticated, redirect to home or the original page user was trying to access
  if (isAuthenticated) {
    const params = await searchParams;
    redirect(params.from || '/');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <Image
              src="/realviraly-black.png"
              alt="RealViraly Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </Link>
        </div>
        
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <LoginForm />
        </div>
        
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
