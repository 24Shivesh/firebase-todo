import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <form
        onSubmit={handleRegister}
        className="bg-white border-4 border-black rounded-md p-8 shadow-[8px_8px_0px_0px_#000] w-full max-w-sm space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-black">Register</h2>

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
          className="w-full bg-blue-500 text-white border-2 border-black py-2 rounded font-semibold shadow-[4px_4px_0px_0px_#000] hover:bg-blue-600 transition"
        >
          Create Account
        </button>

        <p className="text-sm text-center text-black">
          Already have an account?{' '}
          <a href="/login" className="underline text-blue-600">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
