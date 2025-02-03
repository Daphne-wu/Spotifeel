'use client'
import { signIn, useSession } from 'next-auth/react';

const LoginButton = () => {
  const {data: session} = useSession();
  if (session) return null; // Don't show button if already logged in
  
  return (
    <button
      onClick={() => signIn('spotify')}
      className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
    >
      Login with Spotify
    </button>
  );
};

export default LoginButton;
