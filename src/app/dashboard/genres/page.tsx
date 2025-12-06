'use client';

import React from 'react';
import styles from './page.module.css';

export default function DashboardGenresPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Türler</h1>
      <p className={styles.subtitle}>Film türlerini yönetin</p>
    </div>
  );
}
