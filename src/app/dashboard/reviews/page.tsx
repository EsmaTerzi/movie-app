'use client';

import React from 'react';
import styles from './page.module.css';

export default function DashboardReviewsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Değerlendirmeler</h1>
      <p className={styles.subtitle}>Kullanıcı değerlendirmelerini yönetin</p>
    </div>
  );
}
