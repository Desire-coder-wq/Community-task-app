// API Configuration for TaskHub

// Your local IP address for development
const LOCAL_IP = '192.168.28.166';

// Determine API URL based on environment
const getApiUrl = () => {
  if (__DEV__) {
    // Development mode - use local backend
    return `http://${LOCAL_IP}:3001`;
  }
  // Production mode - replace with your production URL
  return 'https://your-production-api.com';
};

export const API_URL = getApiUrl();

// Authentication endpoints
export const authApi = {
  register: `${API_URL}/auth/register`,
  login: `${API_URL}/auth/login`,
  profile: `${API_URL}/auth/profile`,
};

// Task endpoints (matching Prisma Task model)
export const tasksApi = {
  getAll: `${API_URL}/tasks`,
  create: `${API_URL}/tasks`,
  getOne: (id: string) => `${API_URL}/tasks/${id}`,
  update: (id: string) => `${API_URL}/tasks/${id}`,
  delete: (id: string) => `${API_URL}/tasks/${id}`,
};

// Community endpoints (matching Prisma Community model)
export const communityApi = {
  getAll: `${API_URL}/communities`,
  create: `${API_URL}/communities`,
  getOne: (id: string) => `${API_URL}/communities/${id}`,
  update: (id: string) => `${API_URL}/communities/${id}`,
  delete: (id: string) => `${API_URL}/communities/${id}`,
};

// User endpoints (matching Prisma User model)
export const userApi = {
  getAll: `${API_URL}/users`,
  getOne: (id: string) => `${API_URL}/users/${id}`,
  update: (id: string) => `${API_URL}/users/${id}`,
  delete: (id: string) => `${API_URL}/users/${id}`,
};