import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/validate', { email, pass });
      if (response.data) {
        router.push('/home'); // Ruta protegida
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErr("Invalid credentials please try again")
    }
  };
    

  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2b2b2b] px-4 py-12 md:px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-[#d9d9d9]">Iniciar sesión</h1>
          <p className="text-[#a6a6a6]">Ingresa tus credenciales para acceder a tu cuenta</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#d9d9d9]" htmlFor="username">
                Email
              </label>
              <input
                className="block w-full rounded-md border-[#404040] bg-[#2b2b2b] px-3 py-2 text-[#d9d9d9] placeholder-[#a6a6a6] focus:border-[#ffca2c] focus:outline-none focus:ring-[#ffca2c]"
                id="username"
                placeholder="Ingresa el usuario"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-[#d9d9d9]" htmlFor="password">
                  Contraseña
                </label>
                <a className="text-sm font-medium text-cyan-300 hover:underline" href="#">
                  ¿Olvidaste la contraseña?
                </a>
              </div>
              <input
                className="block w-full rounded-md border-[#404040] bg-[#2b2b2b] px-3 py-2 text-[#d9d9d9] placeholder-[#a6a6a6] focus:border-[#ffca2c] focus:outline-none focus:ring-[#ffca2c]"
                id="password"
                placeholder="Ingresa la contraseña"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <button
              className="w-full rounded-md bg-cyan-600 py-2 px-4 font-medium text-white hover:bg-cyan-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ffca2c] focus:ring-offset-2"
              type="submit">
              Iniciar sesión
            </button>
            <p className="text-center text-sm text-[#a6a6a6]">
              ¿No tienes una cuenta? 
              <a className="font-medium text-cyan-300 hover:underline" href="/singup">
                 Registrarse
              </a>
            </p>
          </div>
        </form>
        {err && <p className="text-red-500">{err}</p>}
      </div>
      <div className="absolute inset-0 -z-10 bg-[url(/construction-bg.jpg)] bg-cover bg-center opacity-50 blur-sm" />
    </div>
  );
};

export default Login;
