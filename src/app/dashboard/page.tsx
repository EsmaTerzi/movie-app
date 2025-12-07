'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/admin.service';
import { StatusResponse } from '@/types';
import styles from './page.module.css';

export default function DashboardPage() {
  const [stats, setStats] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const data = await adminService.getStatistics();
      setStats(data);
    } catch (error) {
      console.error('İstatistikler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Genel Bakış</h1>
      <p className={styles.subtitle}>Admin panel ana sayfasına hoş geldiniz</p>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🎬</div>
          <div className={styles.statContent}>
            <h3>Toplam Film</h3>
            <p className={styles.statNumber}>{stats?.totalMovies || 0}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statContent}>
            <h3>Toplam Kullanıcı</h3>
            <p className={styles.statNumber}>{stats?.totalUsers || 0}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statContent}>
            <h3>Toplam Değerlendirme</h3>
            <p className={styles.statNumber}>{stats?.totalReviews || 0}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏷️</div>
          <div className={styles.statContent}>
            <h3>Toplam Tür</h3>
            <p className={styles.statNumber}>{stats?.totalGenres || 0}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📝</div>
          <div className={styles.statContent}>
            <h3>Toplam İzleme Listesi</h3>
            <p className={styles.statNumber}>{stats?.totalWatchlists || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
