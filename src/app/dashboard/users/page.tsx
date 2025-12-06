'use client';

import React from 'react';
import styles from './page.module.css';

export default function DashboardUsersPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Kullanıcılar</h1>
      <p className={styles.subtitle}>Sistem kullanıcılarını yönetin</p>
    </div>
  );
}
