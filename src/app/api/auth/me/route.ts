import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/firebase/firebase-admin';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ 
        success: false,
        error: 'User not authenticated' 
      }, { status: 401 });
    }
    
    // Return only the necessary user data
    return NextResponse.json({
      success: true,
      data: {
        uid: currentUser.uid,
        email: currentUser.email || null,
        displayName: currentUser.displayName || null,
        photoURL: currentUser.photoURL || null,
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch user data' 
    }, { status: 500 });
  }
} 