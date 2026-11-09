import axios from "axios";
import { API_CONFIG } from "../../constants/config";
import usuarioRepository from "../../repositories/usuarioRepository";

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await usuarioRepository.obtenerToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

let onTokenExpired = null;

export const configurarLogoutAutomatico = (callback) => {
  onTokenExpired = callback;
};

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      if (onTokenExpired) {
        await onTokenExpired();
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
