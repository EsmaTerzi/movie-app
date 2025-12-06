'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { User, LoginData, RegisterData, AuthResponse } from '@/types';
import { authService } from '@/services/auth.service';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sayfa yüklendiğinde kullanıcıyı kontrol et
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = Cookies.get('token');
        const savedUser = Cookies.get('user');

        if (token && savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          
          // Token'ı doğrula (opsiyonel)
          try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            Cookies.set('user', JSON.stringify(currentUser), { 
              expires: 7,
              path: '/',
              sameSite: 'lax'
            });
          } catch (error) {
            // Token geçersiz, temizle
            Cookies.remove('token', { path: '/' });
            Cookies.remove('user', { path: '/' });
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginData) => {
    try {
      const response: AuthResponse = await authService.login(credentials);
      
      // Token ve kullanıcı bilgilerini kaydet
      Cookies.set('token', response.token, { 
        expires: 7, 
        path: '/',
        sameSite: 'lax'
      });
      
      const userData: User = {
        id: response.id,
        username: response.username,
        email: response.email,
        role: response.role,
      };
      
      Cookies.set('user', JSON.stringify(userData), { 
        expires: 7,
        path: '/',
        sameSite: 'lax'
      });
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Giriş başarısız');
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response: AuthResponse = await authService.register(data);
      
      // Kayıt sonrası otomatik giriş yap
      Cookies.set('token', response.token, { 
        expires: 7,
        path: '/',
        sameSite: 'lax'
      });
      
      const userData: User = {
        id: response.id,
        username: response.username,
        email: response.email,
        role: response.role,
      };
      
      Cookies.set('user', JSON.stringify(userData), { 
        expires: 7,
        path: '/',
        sameSite: 'lax'
      });
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Kayıt başarısız');
    }
  };

  const logout = () => {
    // Token ve kullanıcı bilgilerini temizle
    Cookies.remove('token', { path: '/' });
    Cookies.remove('user', { path: '/' });
    setUser(null);
    
    // Login sayfasına yönlendir
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;
