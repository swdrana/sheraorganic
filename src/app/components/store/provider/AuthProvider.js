"use client";

import { SessionProvider } from "next-auth/react";

// refetchOnWindowFocus is off: re-polling /api/auth/session on every tab switch added server
// load without changing anything (the JWT session is still refreshed on navigation/sign-in/out
// and synced across tabs by next-auth's broadcast).
export const AuthProvider = ({ children }) => {
  return <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>;
};
