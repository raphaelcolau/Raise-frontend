import axios from 'axios';
import { API_URL } from '../api';

export const returnCalendarInfo = async () => {
  const response = await axios.get(`${API_URL}/api/training/calendar`);
  return response.data;
};