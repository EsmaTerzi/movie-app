'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { adminService } from '@/services/admin.service';
import { User } from '@/types';
import Table, { Column } from '@/components/common/Table';

export default function DashboardUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Kullanıcılar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<User>[] = [
    { key: 'id', header: 'ID', width: '80px' },
    { key: 'username', header: 'Kullanıcı Adı', width: '200px' },
    { key: 'email', header: 'Email', width: '250px' },
    { key: 'role', header: 'Rol', width: '120px' },
    { key: 'createdAt', header: 'Kayıt Tarihi', width: '180px', render: (user) => user.createdAt ? new Date(user.createdAt).toLocaleDateString('tr-TR') : '-' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Kullanıcılar</h1>
      <p className={styles.subtitle}>Sistem kullanıcılarını yönetin</p>
      <Table columns={columns} data={users} loading={loading} emptyMessage="Kullanıcı bulunamadı" />
    </div>
  );
}
