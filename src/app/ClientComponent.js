// src/app/ClientComponent.js
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function ClientComponent() {
  
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      {!session && (
        <>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <p>Welcome, {session.user.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}