import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { revokeAllSessions } from "@/lib/firebase/firebase-admin";

export const dynamic = 'force-dynamic';

export async function GET() {
  // Get the session cookie from the request
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) {
    return NextResponse.json(
      { success: false, error: "Session not found." },
      { status: 400 }
    );
  }

  try {
    // Revoke all sessions for the user
    await revokeAllSessions(sessionCookie);
    
    // Create response and delete the cookie
    const response = NextResponse.json({
      success: true,
      data: "Signed out successfully.",
    });
    
    response.cookies.delete("__session");
    
    return response;
  } catch (error) {
    console.error("Error signing out:", error);
    return NextResponse.json(
      { success: false, error: "Failed to sign out." },
      { status: 500 }
    );
  }
} 