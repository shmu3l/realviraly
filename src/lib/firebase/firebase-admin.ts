import "server-only";

import { headers } from "next/headers";

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { SessionCookieOptions, getAuth } from "firebase-admin/auth";

// Helper function to get service account credentials
function getServiceAccountCredentials() {
  try {
    if (!process.env.FIREBASE_ADMIN_PROJECT_ID || 
        !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 
        !process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
      throw new Error('Firebase Admin SDK credentials are missing from environment variables');
    }
    
    // Handle the private key - ensure proper PEM format
    let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    
    // If the key is enclosed in quotes, remove them
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    
    // Replace literal \n with actual newlines
    privateKey = privateKey.replace(/\\n/g, '\n');
    
    return {
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: privateKey,
    };
  } catch (error) {
    console.error('Error getting Firebase Admin credentials:', error);
    throw error;
  }
}

// Initialize Firebase Admin SDK - with error handling
import { App } from 'firebase-admin/app';

let firebaseApp: App;
try {
  firebaseApp = 
    getApps().find((app) => app.name === "firebase-admin-app") ||
    initializeApp(
      {
        credential: cert(getServiceAccountCredentials()),
      },
      "firebase-admin-app"
    );
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  throw error;
}

export const auth = getAuth(firebaseApp);

export async function isUserAuthenticated(
  session: string | undefined = undefined
) {
  const _session = session ?? (await getSession());
  if (!_session) return false;

  try {
    const isRevoked = !(await auth.verifySessionCookie(_session, true));
    return !isRevoked;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!(await isUserAuthenticated(session))) {
    return null;
  }

  const decodedIdToken = await auth.verifySessionCookie(session!);
  const currentUser = await auth.getUser(decodedIdToken.uid);

  return currentUser;
}

// Get session cookie directly from headers to avoid type issues
async function getSession(): Promise<string | undefined> {
  try {
    // Parse cookies manually from the Cookie header - await the headers() call
    const cookieHeader = (await headers()).get('cookie') || '';
    const cookies = parseCookies(cookieHeader);
    return cookies['__session'];
  } catch (error) {
    console.error("Error reading session cookie:", error);
    return undefined;
  }
}

// Helper function to parse cookies from a header string
function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  
  if (!cookieHeader) return cookies;
  
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      const name = parts[0].trim();
      const value = parts.slice(1).join('=').trim();
      cookies[name] = value;
    }
  });
  
  return cookies;
}

export async function createSessionCookie(
  idToken: string,
  sessionCookieOptions: SessionCookieOptions
) {
  return auth.createSessionCookie(idToken, sessionCookieOptions);
}

export async function revokeAllSessions(session: string) {
  const decodedIdToken = await auth.verifySessionCookie(session);

  return await auth.revokeRefreshTokens(decodedIdToken.sub);
} 