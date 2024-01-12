import axios from 'axios';
import { API_URL } from '../api';

export const getTrainingByID = async (id: number) => {
  const response = await axios.get(`${API_URL}/api/training/${id}`);
  return response.data;
};