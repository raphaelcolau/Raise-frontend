import axios from 'axios';
import { API_URL } from './api';

export const resetPassword = async (email: string, token: string, newPassword: string) => {
  const response = await axios.post(`${API_URL}/api/auth/reset-password`, {
    email,
    token,
    newPassword,
  });
  return response.data;
};