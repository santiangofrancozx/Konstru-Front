import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [err, setErr] = useState('');
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (pass !== confirmPass) {
      setErr('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('api/user/create', { nombre: firstName, apellido: lastName, email, password: pass });
      if (response.status == 200) {
        router.push('/home'); // Ruta protegida
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErr("Registration failed, please try again");
    }
  };

  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2b2b2b] px-4 py-12 md:px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-[#d9d9d9]">Sign Up</h1>
          <p className="text-[#a6a6a6]">Create your account by filling in the details below.</p>
        </div>
        <form onSubmit={handleSignUp}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#d9d9d9]" htmlFor="first-name">
                First Name
              </label>
              <input
                className="block w-full rounded-md border-[#404040] bg-[#2b2b2b] px-3 py-2 text-[#d9d9d9] placeholder-[#a6a6a6] focus:border-[#ffca2c] focus:outline-none focus:ring-[#ffca2c]"
                id="first-name"
                placeholder="Enter your first name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#d9d9d9]" htmlFor="last-name">
                Last Name
              </label>
              <input
                className="block w-full rounded-md border-[#404040] bg-[#2b2b2b] px-3 py-2 text-[#d9d9d9] placeholder-[#a6a6a6] focus:border-[#ffca2c] focus:outline-none focus:ring-[#ffca2c]"
                id="last-name"
                placeholder="Enter your last name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#d9d9d9]" htmlFor="email">
                Email
              </label>
              <input
                className="block w-full rounded-md border-[#404040] bg-[#2b2b2b] px-3 py-2 text-[#d9d9d9] placeholder-[#a6a6a6] focus:border-[#ffca2c] focus:outline-none focus:ring-[#ffca2c]"
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#d9d9d9]" htmlFor="password">
                Password
              </label>
              <input
                className="block w-full rounded-md border-[#404040] bg-[#2b2b2b] px-3 py-2 text-[#d9d9d9] placeholder-[#a6a6a6] focus:border-[#ffca2c] focus:outline-none focus:ring-[#ffca2c]"
                id="password"
                placeholder="Enter your password"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#d9d9d9]" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                className="block w-full rounded-md border-[#404040] bg-[#2b2b2b] px-3 py-2 text-[#d9d9d9] placeholder-[#a6a6a6] focus:border-[#ffca2c] focus:outline-none focus:ring-[#ffca2c]"
                id="confirm-password"
                placeholder="Confirm your password"
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <button
              className="w-full rounded-md bg-[#ffca2c] py-2 px-4 font-medium text-[#1a1a1a] hover:bg-[#ffc300] focus:outline-none focus:ring-2 focus:ring-[#ffca2c] focus:ring-offset-2"
              type="submit">
              Sign Up
            </button>
            <p className="text-center text-sm text-[#a6a6a6]">
              Already have an account?
              <a className="font-medium text-[#ffca2c] hover:underline" href="#">
                Sign In
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

export default SignUp;
