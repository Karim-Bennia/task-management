// src/services/authService.ts
import axios from 'axios';
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '@/interfaces/auth';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
  
export const login = async (credentials: LoginCredentials): Promise<AuthResponse>  => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data; // Returns token or relevant data from back-end
  } catch (error) {
    console.log(error)
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, credentials);
        return response.data; // Returns token or relevant data from back-end
      } catch (error) {
        console.log(error)
    
        throw new Error('Login failed. Please check your credentials.');
      }
    };
  
