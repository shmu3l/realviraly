import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientUserProvider, User } from "@/components/ClientUserProvider";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RealViraly",
  description: "Your platform for real viral content",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get current user from the server (if authenticated)
  const currentUser = await getCurrentUser();
  
  // Format the user data for the client
  const clientUser: User | null = currentUser ? {
    uid: currentUser.uid,
    email: currentUser.email || null,
    displayName: currentUser.displayName || null,
    photoURL: currentUser.photoURL || null,
  } : null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientUserProvider initialUser={clientUser}>
          {children}
        </ClientUserProvider>
      </body>
    </html>
  );
}
