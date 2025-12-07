import axiosInstance from '@/utils/axios';
import { LoginData, RegisterData, AuthResponse, User } from '@/types';

export const authService = {
  // Kullanıcı girişi
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('auth/login', credentials);
    return response.data;
  },

  // Kullanıcı kaydı
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('auth/signup', data);
    return response.data;
  },

  // Çıkış yap
  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
  },
};
