import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  return localStorage.getItem('token');
};

export const verifyToken = async (token: string) => {
  const response = await axios.get(`${API_URL}/auth/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getTaskSummary = async () => {
  console.log(API_URL)
    try { 
      const token = getToken(); // Get the token
      const response = await axios.get(`${API_URL}/tasks/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
  return response.data;
} catch (error) {
    console.log(error)
    throw new Error('Failed to fetch task summary');
  }
};

export const getUsers = async () => {
  try {
  const token = getToken();
  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
} catch (error) {
    console.log(error)
    throw new Error('Failed to fetch users');
  }
};

export const getOverdueTasks = async () => {
    try { 
      const token = getToken(); 
      const response = await axios.get(`${API_URL}/tasks/overdue`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return response.data;
} catch (error) {
    console.log(error)
    throw new Error('Failed to fetch overdue tasks');
  }
};
