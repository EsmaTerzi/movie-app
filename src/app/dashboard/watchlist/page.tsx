'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/admin.service';
import { useNotification } from '@/contexts/NotificationContext';
import styles from './page.module.css';
import { WatchlistItem } from '@/types';

export default function DashboardWatchlistPage() {
  const [watchlists, setWatchlists] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { error } = useNotification();

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const fetchWatchlists = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllWatchLists();
      setWatchlists(data);
    } catch (err) {
      error('İzleme listeleri yüklenirken hata oluştu.');
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
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>İzleme Listeleri</h1>
          <p className={styles.subtitle}>Toplam {watchlists.length} izleme listesi</p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Liste Adı</th>
              <th>Oluşturulma Tarihi</th>
            </tr>
          </thead>
          <tbody>
            {watchlists.length === 0 ? (
              <tr>
                <td colSpan={4} className={styles.emptyState}>
                  Henüz izleme listesi bulunmuyor.
                </td>
              </tr>
            ) : (
              watchlists.map((watchlist) => (
                <tr key={watchlist.id}>
                  <td className={styles.listName}>{watchlist.name}</td>
                  <td>
                    {new Date(watchlist.createdAt).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
