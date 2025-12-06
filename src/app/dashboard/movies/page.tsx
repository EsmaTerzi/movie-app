'use client';

import React from 'react';
import styles from './page.module.css';

export default function DashboardMoviesPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Filmler</h1>
      <p className={styles.subtitle}>Film koleksiyonunu yönetin</p>
    </div>
  );
}
