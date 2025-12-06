'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import styles from '../login/page.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { success, error: showError } = useNotification();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!formData.email) {
      newErrors.email = 'E-posta adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      success('Kayıt başarılı! Hoş geldiniz.');
      router.push('/');
    } catch (error: any) {
      const errorMessage = error.message || 'Kayıt başarısız';
      setErrors({ submit: errorMessage });
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Kayıt Ol</h1>
        <p className={styles.subtitle}>
          Yeni bir hesap oluşturun ve film dünyasını keşfetmeye başlayın.
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
            label="E-posta"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="ornek@email.com"
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

          <Input
            label="Şifre Tekrar"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="••••••••"
            fullWidth
          />

          {errors.submit && <div className={styles.errorMessage}>{errors.submit}</div>}

          <Button type="submit" fullWidth loading={loading}>
            Kayıt Ol
          </Button>
        </form>

        <p className={styles.footer}>
          Zaten hesabınız var mı?{' '}
          <Link href="/auth/login" className={styles.link}>
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
