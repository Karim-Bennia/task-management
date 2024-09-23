"use client"; 

import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import { TaskProvider } from '@/context/TaskContext'; 

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TaskProvider>
            <Navbar />
            {children}
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
