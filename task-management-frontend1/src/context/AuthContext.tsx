// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as authService from '@/services/authService'; // Import the service
import { LoginCredentials, RegisterCredentials } from '@/interfaces/auth';
import { verifyToken } from '@/services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token).then(() => {
        setIsAuthenticated(true);
      }).catch(() => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      });
    }
  }, []);
  
  const login = async (credentials: LoginCredentials) => {
    try {
      const { token } = await authService.login(credentials);
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      router.push('/taskboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const { token } = await authService.register(credentials); // Use authService register
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      router.push('/taskboard');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
