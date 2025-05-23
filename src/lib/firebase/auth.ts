'use client';

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

// Type for API responses
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const userCreds = await signInWithPopup(auth, provider);
    const idToken = await userCreds.user.getIdToken();

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
    
    const resBody = await response.json() as APIResponse<string>;
    
    if (response.ok && resBody.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error signing in with Google", error);
    return false;
  }
}

export async function signOut() {
  try {
    await auth.signOut();

    const response = await fetch("/api/auth/sign-out", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const resBody = await response.json() as APIResponse<string>;
    
    if (response.ok && resBody.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error signing out", error);
    return false;
  }
} 