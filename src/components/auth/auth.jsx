// hooks/useAuth.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga añadido

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verifica el token con una llamada a una ruta protegida de la API, por ejemplo /checkToken
        const response = await axios.get('/api/auth/check-token');
        if (response.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthenticated(false);
      } finally {
        setLoading(false); // Termina la carga una vez que se completa la verificación
      }
    };

    checkAuth();
  }, []);

  return { authenticated, loading };
}
