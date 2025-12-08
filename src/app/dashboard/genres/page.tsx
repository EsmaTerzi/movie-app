"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { adminService } from "@/services/admin.service";
import { Genre } from "@/types";
import Table, { Column } from "@/components/common/Table";
import GenreAddModal from "./modal/GenreAddModal";
import Button from "@/components/common/Button/Button";

export default function DashboardGenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllGenres();
      setGenres(data);
    } catch (error) {
      console.error("Türler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<Genre>[] = [
    { key: "id", header: "ID", width: "80px" },
    { key: "name", header: "Tür Adı", width: "250px" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Türler</h1>
          <p className={styles.subtitle}>Film türlerini yönetin</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>+ Yeni Tür Ekle</Button>
      </div>
      <Table
        columns={columns}
        data={genres}
        loading={loading}
        emptyMessage="Tür bulunamadı"
      />
      <GenreAddModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        fetchGenres={fetchGenres}
      />
    </div>
  );
}
