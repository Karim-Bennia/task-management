"use client";

import { redirect } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function HomePage() {
  const { isAuthenticated } = useAuth(); // Check if user is authenticated

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to Onboarding if the user is not authenticated
      redirect('/onboarding');
    } else {
      // Redirect to Dashboard if the user is authenticated
      redirect('/dashboard');
    }
  }, [isAuthenticated]);

  return null; // No UI, as we are handling redirection
}
