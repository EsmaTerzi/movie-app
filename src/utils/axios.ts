import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

// Axios instance oluştur
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Her istekte token ekle
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Hataları yakala
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // 401 durumunda token geçersiz, kullanıcıyı logout yap
      if (error.response.status === 401) {
        Cookies.remove('token');
        Cookies.remove('user');
        
        // Login sayfasına yönlendir (sadece browser'da)
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      }
      
      // 403 - Yetkisiz erişim
      if (error.response.status === 403) {
        console.error('Erişim yetkiniz bulunmamaktadır');
      }
    } else if (error.request) {
      // İstek gönderildi ancak yanıt alınamadı
      console.error('Sunucuya ulaşılamıyor');
    } else {
      // İstek hazırlanırken hata oluştu
      console.error('İstek hatası:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
