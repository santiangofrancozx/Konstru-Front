'use client'
import Homedark from '@/components/pages/homedark'; // Ruta absoluta al componente homee
import PrivateRoute from "@/components/auth/PrivateRoute";

export default function HomePage() {
  return (
    <div>
      <PrivateRoute>
        <Homedark /> 
      </PrivateRoute>
    </div>
  );
}
