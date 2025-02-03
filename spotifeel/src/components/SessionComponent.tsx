'use client';

import { useSession } from 'next-auth/react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import TopTrackCard from '@/src/app/dashboard/components/TopTrackCard';

const SessionComponent = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="text-black">
      {!session ? (
        <LoginButton />
      ) : (
        <div>
          <h1>Welcome, {session.user?.name}!</h1>
          <TopTrackCard />
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default SessionComponent;
