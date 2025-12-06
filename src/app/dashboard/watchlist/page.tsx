'use client';

import React from 'react';
import styles from './page.module.css';

export default function DashboardWatchlistPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>İzleme Listeleri</h1>
      <p className={styles.subtitle}>Kullanıcı izleme listelerini yönetin</p>
    </div>
  );
}
