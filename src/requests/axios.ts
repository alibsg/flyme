import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_RAPID_API_BASE_URL;
const API_HEADERS: { [key: string]: string } = {
  'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
  'x-rapidapi-host': import.meta.env.VITE_RAPID_API_HOST,
};

export const axiosInstance = axios.create({ baseURL: API_BASE_URL });

axiosInstance.interceptors.request.use(
  (config) => {
    for (const key of Object.keys(API_HEADERS)) {
      config.headers.set(key, API_HEADERS[key]);
    }
    return config;
  },
  (error) => Promise.reject(error)
);
