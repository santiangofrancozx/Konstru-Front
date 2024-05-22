// hooks/useAuth.js
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verifica el token con una llamada a una ruta protegida de la API, por ejemplo /checkToken
        const response = await axios.get('http://localhost:8082/checkToken', { withCredentials: true });
        if (response.status == 200){
          setAuthenticated(true);
        } else{
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthenticated(false);
      }      
    };
    checkAuth();
  }, []);

  return { authenticated };
}
