// src/providers.tsx
"use client"; // Make sure to mark this as a client component
import { SessionProvider } from "next-auth/react"; // Import the SessionProvider

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>; // Wrap children with SessionProvider
}
