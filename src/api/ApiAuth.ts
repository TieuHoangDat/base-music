import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com'; // 📝 thay đổi nếu cần

const ApiAuth = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  },

  getUserProfile: async (token: string) => {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};

export default ApiAuth;
