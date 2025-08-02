'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ADMIN_USER, ADMIN_PASS } from '@/lib/env.client';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginForm() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (login === ADMIN_USER && pass === ADMIN_PASS) {
      const token = Date.now().toString();
      localStorage.setItem('admin', token);
      localStorage.setItem('admin_token_time', token);
      router.push('/admin');
    } else {
      setError('Nieprawidłowy login lub hasło');
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm border border-[#8d6e63]"
      >
        <h2 className="text-xl font-bold mb-4 text-center font-serif">Logowanie do panelu</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <div className="relative mb-4">
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="Hasło"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#657157] text-white py-2 rounded hover:bg-[#3f4a3c] transition"
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
}
