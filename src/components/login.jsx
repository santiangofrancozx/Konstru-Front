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
      const response = await axios.post('/api/validateUser', { email, pass });
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
          <h1 className="text-3xl font-bold text-[#d9d9d9]">Sign In</h1>
          <p className="text-[#a6a6a6]">Enter your credentials to access your account.</p>
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
                placeholder="Enter your username"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-[#d9d9d9]" htmlFor="password">
                  Password
                </label>
                <a className="text-sm font-medium text-[#ffca2c] hover:underline" href="#">
                  Forgot password?
                </a>
              </div>
              <input
                className="block w-full rounded-md border-[#404040] bg-[#2b2b2b] px-3 py-2 text-[#d9d9d9] placeholder-[#a6a6a6] focus:border-[#ffca2c] focus:outline-none focus:ring-[#ffca2c]"
                id="password"
                placeholder="Enter your password"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <button
              className="w-full rounded-md bg-[#ffca2c] py-2 px-4 font-medium text-[#1a1a1a] hover:bg-[#ffc300] focus:outline-none focus:ring-2 focus:ring-[#ffca2c] focus:ring-offset-2"
              type="submit">
              Sign In
            </button>
            <p className="text-center text-sm text-[#a6a6a6]">
              Dont have an account?
              <a className="font-medium text-[#ffca2c] hover:underline" href="#">
                Sign Up
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
