"use client";

import React from 'react';
import Link from 'next/link';
import { FaTasks } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: isAuthenticated ? '/taskboard' : '/' }, 
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <header className="bg-white shadow-md">
      <nav className="mx-auto max-w-7xl p-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link href={isAuthenticated ? '/taskboard' : '/'} className="text-black flex items-center">
            <FaTasks className="h-10 w-10 text-black" />
            <span className="ml-2 text-lg font-bold">Task Manager</span>
          </Link>
        </div>

        <div className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-lg font-semibold">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex space-x-4 items-center">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="text-lg font-semibold"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="text-lg font-semibold">
                Log in
              </Link>
              <Link href="/register" className="bg-black text-white px-4 py-2 rounded-lg">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
