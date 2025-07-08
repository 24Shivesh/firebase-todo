import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <form
        onSubmit={handleLogin}
        className="bg-white border-4 border-black rounded-md p-8 shadow-[8px_8px_0px_0px_#000] w-full max-w-sm space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-black">Login</h2>

        <input
          className="w-full px-4 py-2 border-2 border-black bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black shadow-[4px_4px_0px_0px_#000]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />

        <input
          className="w-full px-4 py-2 border-2 border-black bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black shadow-[4px_4px_0px_0px_#000]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white border-2 border-black py-2 rounded font-semibold shadow-[4px_4px_0px_0px_#000] hover:bg-green-600 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-black">
          Don’t have an account?{' '}
          <a href="/register" className="underline text-blue-600">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
