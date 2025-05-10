"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useAuth } from "@/components/ClientUserProvider";

// Note: If react-icons package is installed, you can use this instead:
// import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshUser } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const success = await signInWithGoogle();
      
      if (success) {
        // Refresh user data after successful login
        await refreshUser();
        
        // Check if there's a 'from' parameter to redirect back to
        const fromPath = searchParams.get('from');
        router.push(fromPath || '/');
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      console.error("Error signing in with Google", err);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-gray-500 mt-2">
          Sign in to your account to continue
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm bg-red-100 border border-red-200 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <Button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </Button>
      </div>
    </div>
  );
}
