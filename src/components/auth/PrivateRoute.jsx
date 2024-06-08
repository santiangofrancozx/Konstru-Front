// components/PrivateRoute.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de importar desde 'next/router'
import { useAuth } from '@/components/auth/auth'; // Ruta actualizada al hook de autenticación

const PrivateRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push('/login');
    }
  }, [authenticated, loading, router]);

  if (loading) {
    return <p>Loading...</p>; // Mostrar un mensaje de carga mientras se verifica la autenticación
  }

  if (!authenticated) {
    return null; // O un componente de redirección a la página de login
  }

  return children;
};

export default PrivateRoute;
