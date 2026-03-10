import axios from 'axios';

// 軟體工程實踐：從環境變數讀取網址，增加擴展性
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const sendChatMessage = async (message: string) => {
  try {
    // 這裡對應後端的 @router.post("/chat")，路徑加上 prefix "/api"
    const response = await apiClient.post('/api/chat', { message });
    return response.data.content;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('無法連線至 AI 服務');
  }
};