'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { adminService } from '@/services/admin.service';
import { ReviewAdmin } from '@/types';
import Table, { Column } from '@/components/common/Table';

export default function DashboardReviewsPage() {
  const [reviews, setReviews] = useState<ReviewAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllReviews();
      setReviews(data);
    } catch (error) {
      console.error('Değerlendirmeler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<ReviewAdmin>[] = [
    { key: 'id', header: 'ID', width: '80px' },
    { 
      key: 'movie', 
      header: 'Film', 
      width: '250px',
      render: (review) => review.movie.title
    },
    { key: 'rating', header: 'Puan', width: '100px' },
    { 
      key: 'reviewText', 
      header: 'Yorum', 
      width: '400px',
      render: (review) => review.reviewText || '-'
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Değerlendirmeler</h1>
      <p className={styles.subtitle}>Kullanıcı değerlendirmelerini yönetin</p>
      <Table columns={columns} data={reviews} loading={loading} emptyMessage="Değerlendirme bulunamadı" />
    </div>
  );
}
