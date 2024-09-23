"use client";

import React, { useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Email validation using regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // Reset error message

    // Validate email format
    if (!isValidEmail(email)) {
      setError('Email is invalid');
      return;
    }

    // Validate password length
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    // Proceed with login attempt
    try {
      setLoading(true); // Show loading state
      await login({ email, password });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="mt-10 flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          {/* Title and icon */}
          <div className="flex justify-center flex-col items-center">
            <FaTasks className="h-10 w-10 text-black" />
            <h2 className="mb-10 mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          {/* Form starts */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Show error message if any */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Email input */}
            <div>
              <input
                type="email"
                placeholder="Email address"
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                required
                className="block w-full px-3 py-1.5 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
                <span className="ml-2 block text-sm text-gray-900">Remember me</span>
              </label>
            </div>

            {/* Submit button with loading state */}
            <div>
              <button
                type="submit"
                disabled={loading} // Disable button during loading
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-white hover:text-black border border-black'
                }`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
