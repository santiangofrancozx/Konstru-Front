'use client'
import Homedark from '@/components/Homedark'; // Ruta absoluta al componente homee
import PrivateRoute from "@/components/PrivateRoute";

export default function HomePage() {
  return (
    <div>
      <PrivateRoute>
        <Homedark /> 
      </PrivateRoute>
    </div>
  );
}
