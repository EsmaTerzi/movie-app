'use client';

import React, { useEffect, useState } from 'react';
import { authService } from '@/services/auth.service';
import { User } from '@/types';
import styles from './page.module.css';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useNotification } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/AuthContext';

function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editField, setEditField] = useState<{ key: string; label: string; value: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { success, error, warning } = useNotification();
  const { logout } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await authService.profile();
      setProfile(data);
    } catch (error) {
      console.error('Profil yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditField = (key: string, label: string, value: string) => {
    setEditField({ key, label, value });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditField(null);
  };

  const handleSave = async () => {
    if (!editField) return;
    setSubmitting(true);
    try {
      await authService.updateProfile({ [editField.key]: editField.value });
      
      if (editField.key === 'username') {
        success(`${editField.label} başarıyla güncellendi!`);
        handleCloseModal();
        
        setTimeout(() => {
          warning('Kullanıcı adınız değiştirildi. Güvenlik nedeniyle tekrar giriş yapmalısınız.');
          setTimeout(() => {
            logout();
          }, 2000);
        }, 1000);
      } else {
        success(`${editField.label} başarıyla güncellendi!`);
        await fetchProfile();
        handleCloseModal();
      }
    } catch (err) {
      error('Güncelleme sırasında bir hata oluştu.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Yüklüyor...</div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarLarge}>
            {profile?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className={styles.headerInfo}>
            <h1 className={styles.userName}>{profile?.username || 'Kullanıcı'}</h1>
            <p className={styles.userEmail}>{profile?.email || '-'}</p>
            <span className={styles.badge}>{profile?.role || 'USER'}</span>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Hesap Bilgileri</h2>
          <div className={styles.infoGrid}>
            <div 
              className={styles.infoCard} 
              onClick={() => handleEditField('username', 'Kullanıcı Adı', profile?.username || '')}
            >
              <div className={styles.infoIcon}>👤</div>
              <div className={styles.infoContent}>
                <label className={styles.infoLabel}>Kullanıcı Adı</label>
                <p className={styles.infoValue}>{profile?.username || '-'}</p>
              </div>
            </div>
            <div 
              className={styles.infoCard}
              onClick={() => handleEditField('email', 'E-posta', profile?.email || '')}
            >
              <div className={styles.infoIcon}>📧</div>
              <div className={styles.infoContent}>
                <label className={styles.infoLabel}>E-posta</label>
                <p className={styles.infoValue}>{profile?.email || '-'}</p>
              </div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🎭</div>
              <div className={styles.infoContent}>
                <label className={styles.infoLabel}>Rol</label>
                <p className={styles.infoValue}>{profile?.role || '-'}</p>
              </div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📅</div>
              <div className={styles.infoContent}>
                <label className={styles.infoLabel}>Kayıt Tarihi</label>
                <p className={styles.infoValue}>
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {showModal && editField && (
          <div className={styles.modalOverlay} onClick={handleCloseModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>{editField.label} Düzenle</h2>
                <button className={styles.closeBtn} onClick={handleCloseModal}>✕</button>
              </div>
              <div className={styles.modalBody}>
                <Input
                  label={editField.label}
                  value={editField.value}
                  onChange={(e) => setEditField({ ...editField, value: e.target.value })}
                  fullWidth
                />
              </div>
              <div className={styles.modalFooter}>
                <Button variant="secondary" onClick={handleCloseModal} disabled={submitting}>
                  İptal
                </Button>
                <Button onClick={handleSave} loading={submitting}>
                  Kaydet
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
export default ProfilePage;
