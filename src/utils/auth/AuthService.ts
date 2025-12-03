export const saveAuthToken = (token: string, userId: number) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userId', userId.toString());
};

export const clearAuth = () => {
  localStorage.clear();
};
