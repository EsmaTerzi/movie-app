'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { success, error: showError } = useNotification();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username) {
      newErrors.username = 'Kullanıcı adı gereklidir';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Kullanıcı adı en az 3 karakter olmalıdır';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData);
      success('Giriş başarılı! Hoş geldiniz.');
      router.push('/');
    } catch (error: any) {
      const errorMessage = error.message || 'Giriş başarısız';
      setErrors({ submit: errorMessage });
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Giriş Yap</h1>
        <p className={styles.subtitle}>
          Film dünyasına hoş geldiniz! Giriş yapın ve keşfetmeye başlayın.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Kullanıcı Adı"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            placeholder="kullaniciadi"
            fullWidth
          />

          <Input
            label="Şifre"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
            fullWidth
          />

          {errors.submit && <div className={styles.errorMessage}>{errors.submit}</div>}

          <Button type="submit" fullWidth loading={loading}>
            Giriş Yap
          </Button>
        </form>

        <p className={styles.footer}>
          Hesabınız yok mu?{' '}
          <Link href={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/register`} className={styles.link}>
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
}
