// Importaciones de módulos y componentes necesarios
'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ConstructionIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 inline-block text-cyan-300 mb-1 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  );

// Componente principal
export default function Component() {
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTriggerAnimation(true);
    setTimeout(() => setTriggerAnimation(false), 2000); // Duración de la animación (2 veces 0.5s cada una)
  }, []);

  // Función para manejar el registro de usuario
  // Función para manejar el registro de usuario
const handleSignUp = async (userData) => {
    try {
      const response = await axios.post('/api/user/create', {
        nombre: userData.firstName,
        apellido: userData.lastName,
        email: userData.email,
        password: userData.password
      });
      if (response.status === 200) {
        Swal.fire("Registro Exitoso", "Se ha registrado correctamente.", "success");
        router.push('/home'); // Redirigir a la página de inicio después del registro exitoso
      } else {
        throw new Error('Registro fallido');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      // Manejar el error de registro aquí
      Swal.fire("Error en el Registro", "Error en el registro, por favor inténtelo de nuevo.", "error");
    }
  };
  

  // Renderización del componente
  return (
    <div className="flex flex-col min-h-screen text-white">
      <header className="bg-cyan-700 text-primary-foreground py-6 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl flex items-center">
          <ConstructionIcon />
          <h1 className={`text-4xl font-extrabold ${triggerAnimation ? 'animate-bounce' : ''}`}>
            Konstru
          </h1>
        </div>
        <div className="container mx-auto max-w-5xl">
          <p className="text-lg text-gray-200 mt-2 max-w-2xl">
            Simplifique la planificación de su proyecto de construcción con nuestra intuitiva herramienta generadora de presupuestos.
          </p>
        </div>
      </header>
      <main className="flex-1 bg-background py-12 md:py-20">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
          <div className="flex flex-col gap-4">
            <img
              src="/whitehelmet.jpeg"
              height={400}
              alt="Construction Budget Generator"
              className="rounded-lg object-cover"
            />
            <img
              src="/moneygrow.jpeg"
              height={400}
              alt="Construction Budget Generator"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-muted-foreground">
              Nuestro generador de presupuestos de construcción le ayuda a planificar su proyecto con facilidad. Simplemente introduzca los detalles necesarios y nuestra herramienta le proporcionará un desglose presupuestario detallado para que la construcción vaya por buen camino.
            </p>
            <Card>
              <CardHeader>
                <CardTitle>Acceder al generador de presupuesto</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Componente de formulario de registro */}
                <SignUpForm onSignUp={handleSignUp} />
                <p className="text-center text-sm text-[#a6a6a6]">
                  ¿Ya tines una cuenta?{' '}
                <a className="font-medium text-cyan-300 hover:underline" href='/login'>
                  Iniciar sesión
                </a>  
                </p>  
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="bg-muted text-muted-foreground py-6 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-sm">&copy; 2024 Construction Budget Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Componente del formulario de registro
const SignUpForm = ({ onSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Llamar a la función de registro del padre (Component) con los datos del formulario
      await onSignUp({ firstName, lastName, email, password });
    } catch (error) {
      setError('Registration failed, please try again');
      console.error('Registration error:', error);
    }
  };

  // Renderización del formulario
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#d9d9d9]" htmlFor="first-name">
            Nombre
          </label>
          <Input
            id="first-name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Ingresa el nombre"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#d9d9d9]" htmlFor="last-name">
            Apellido
          </label>
          <Input
            id="last-name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Ingresa el apellido"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#d9d9d9]" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa el email"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#d9d9d9]" htmlFor="password">
            Contraseña
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese la contraseña"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#d9d9d9]" htmlFor="confirm-password">
            Confirmar contraseña
          </label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar contraseña"
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-2 mt-4">
        <Button
          type="submit"
          className="w-full bg-cyan-600 py-2 px-4 font-medium text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-[#ffca2c] focus:ring-offset-2"
        >
          Registrarse
        </Button>
      </div>
    </form>
  );
};
