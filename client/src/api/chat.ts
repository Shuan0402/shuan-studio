import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const sendChatMessage = async (message: string) => {
  try {
    const response = await apiClient.post('/api/chat', { message });
    return response.data.content;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('無法連線至 AI 服務');
  }
};