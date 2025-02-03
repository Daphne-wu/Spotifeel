'use client'
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  const handleLogout = async () => {
    console.log('Logging out...');
    
    // Just use signOut without manually clearing cookies and localStorage for now
    try {
      await signOut({ callbackUrl: '/' });  // Redirect to home page after sign-out
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
