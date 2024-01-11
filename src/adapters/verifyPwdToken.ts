import axios from 'axios';
import { API_URL } from './api';

export const verifyPwdToken = async (email: string, token: string) => {
  const response = await axios.get(`${API_URL}/api/auth/verify-password-token/${email}/${token}`);
  return response.data;
};