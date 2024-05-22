// components/PrivateRoute.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth';

const PrivateRoute = ({ children }) => {
  const { authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      //router.push('/login');
    }
  }, [authenticated, router]);

  if (!authenticated) {
    return null; // O un loader
  }

  return children;
};

export default PrivateRoute;
