import axios from 'axios';
import { API_URL } from './api';

export const forgotPassword = async (email: string) => {
  const response = await axios.post(`${API_URL}/api/auth/forgot-password`, {
    email, 
  });
  return response.data;
};