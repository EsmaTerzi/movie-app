'use client';

import React from 'react';
import styles from './page.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Genel Bakış</h1>
      <p className={styles.subtitle}>Admin panel ana sayfasına hoş geldiniz</p>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statContent}>
            <h3>İstatistikler</h3>
            <p>Yakında eklenecek</p>
          </div>
        </div>
      </div>
    </div>
  );
}
