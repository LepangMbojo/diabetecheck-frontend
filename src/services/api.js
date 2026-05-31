import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictDiabetes = async (data) => {
  try {
    const response = await apiClient.post('/api/predict', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Gagal menghubungi server' };
  }
};

export const getHistory = async () => {
  try {
    const response = await apiClient.get('/api/history');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Gagal mengambil riwayat' };
  }
};

export const clearHistory = async () => {
  try {
    const response = await apiClient.delete('/api/history');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Gagal menghapus riwayat' };
  }
};

export default apiClient;