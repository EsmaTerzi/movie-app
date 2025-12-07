'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { adminService } from '@/services/admin.service';
import { Genre } from '@/types';
import Table, { Column } from '@/components/common/Table';

export default function DashboardGenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllGenres();
      setGenres(data);
    } catch (error) {
      console.error('Türler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<Genre>[] = [
    { key: 'id', header: 'ID', width: '80px' },
    { key: 'name', header: 'Tür Adı', width: '250px' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Türler</h1>
      <p className={styles.subtitle}>Film türlerini yönetin</p>
      <Table columns={columns} data={genres} loading={loading} emptyMessage="Tür bulunamadı" />
    </div>
  );
}
