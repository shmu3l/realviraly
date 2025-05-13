import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/firebase/firebase-admin";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as { idToken: string };
  const idToken = reqBody.idToken;

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const sessionCookie = await createSessionCookie(idToken, { expiresIn });

    // Set the cookie in the response
    const response = NextResponse.json({
      success: true,
      data: "Signed in successfully.",
    });
    
    response.cookies.set({
      name: "__session",
      value: sessionCookie,
      maxAge: expiresIn / 1000, // Convert to seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { success: false, error: "Failed to sign in." },
      { status: 401 }
    );
  }
} 