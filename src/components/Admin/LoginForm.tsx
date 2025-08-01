'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ADMIN_USER, ADMIN_PASS } from '@/lib/env.client';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem('admin', 'true');
      localStorage.setItem('adminLoginTime', Date.now().toString());

      if (rememberMe) {
        localStorage.setItem('rememberUsername', username);
        localStorage.setItem('rememberPassword', password);
      } else {
        localStorage.removeItem('rememberUsername');
        localStorage.removeItem('rememberPassword');
      }

      router.push('/admin');
    } else {
      setError('Nieprawidłowy login lub hasło');
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberUsername');
    const savedPassword = localStorage.getItem('rememberPassword');
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] text-[#3f4a3c] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 border border-[#657157] rounded-xl shadow-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Logowanie do panelu</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-[#ccc] p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#657157]"
          autoComplete="username"
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#ccc] p-3 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-[#657157]"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-[#657157] hover:underline"
          >
            {showPassword ? 'Ukryj' : 'Pokaż'}
          </button>
        </div>

        <label className="flex items-center gap-2 text-sm mb-6">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="accent-[#657157]"
          />
          Zapamiętaj mnie
        </label>

        <button
          type="submit"
          className="w-full bg-[#657157] text-white py-3 rounded hover:bg-[#3f4a3c] transition"
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
}

