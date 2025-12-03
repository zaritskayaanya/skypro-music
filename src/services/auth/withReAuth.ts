import axios from 'axios';

const withReAuth = (originalFetch) => async (url, options) => {
  try {
    const response = await originalFetch(url, options);
    if (!response.ok && response.status === 401) {
      await refreshToken();
      return originalFetch(url, options);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return;

  try {
    const response = await axios.post('/api/refresh-token', {
      refreshToken,
    });
    localStorage.setItem('authToken', response.data.token);
  } catch (error) {
    throw new Error('Ошибка обновления токена!');
  }
};

export default withReAuth;
