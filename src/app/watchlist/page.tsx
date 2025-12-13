"use client";

import React, { useEffect, useState } from "react";
import { watchlistService } from "@/services/watchlist.service";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import styles from "./page.module.css";
import Link from "next/link";
import { WatchlistItem } from "@/types";

function WatchlistPage() {
  const [watchlists, setWatchlists] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteWatchlistId, setDeleteWatchlistId] = useState<number | null>(
    null
  );
  const [deleting, setDeleting] = useState(false);
  const { user } = useAuth();
  const { success, error } = useNotification();

  useEffect(() => {
    if (user?.id) {
      fetchWatchlists();
    }
  }, [user]);

  const fetchWatchlists = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const data = await watchlistService.getUserWatchlists();
      setWatchlists(data);
    } catch (err) {
      error("İzleme listeleri yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWatchlist = async () => {
    if (!newWatchlistName.trim()) {
      error("Lütfen bir liste adı girin.");
      return;
    }

    setSubmitting(true);
    try {
      await watchlistService.createWatchlist(newWatchlistName);
      success("İzleme listesi başarıyla oluşturuldu!");
      setShowModal(false);
      setNewWatchlistName("");
      fetchWatchlists();
    } catch (err) {
      error("İzleme listesi oluşturulurken hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteWatchlistId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteWatchlist = async () => {
    if (!deleteWatchlistId) return;

    setDeleting(true);
    try {
      await watchlistService.deleteWatchlist(deleteWatchlistId.toString());
      success("İzleme listesi başarıyla silindi!");
      setShowDeleteModal(false);
      setDeleteWatchlistId(null);
      fetchWatchlists();
    } catch (err) {
      error("İzleme listesi silinirken hata oluştu.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className={styles.container}>
          <div className={styles.loading}>Yükleniyor...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>İzleme Listelerim</h1>
          <Button onClick={() => setShowModal(true)} variant="primary">
            + Yeni Liste Oluştur
          </Button>
        </div>

        {watchlists.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <h2>Henüz izleme listeniz yok</h2>
            <p>Film ve dizileri kaydetmek için yeni bir liste oluşturun</p>
            <Button onClick={() => setShowModal(true)} variant="primary">
              İlk Listemi Oluştur
            </Button>
          </div>
        ) : (
          <div className={styles.watchlistGrid}>
            {watchlists.map((watchlist) => (
              <div key={watchlist.id} className={styles.watchlistCardWrapper}>
                <Link
                  href={`/watchlist/${watchlist.id}`}
                  className={styles.watchlistCard}
                >
                  <div className={styles.cardIcon}>🎬</div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.watchlistName}>{watchlist.name}</h3>
                    <div className={styles.cardMeta}>
                      <span className={styles.metaItem}>
                        <span className={styles.metaIcon}>📅</span>
                        {new Date(watchlist.createdAt).toLocaleDateString(
                          "tr-TR",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardArrow}>→</div>
                </Link>
                <button
                  className={styles.deleteButton}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteClick(Number(watchlist.id));
                  }}
                  aria-label="Listeyi sil"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div
            className={styles.modalOverlay}
            onClick={() => setShowModal(false)}
          >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h2 className={styles.modalTitle}>Yeni İzleme Listesi</h2>
              <Input
                label="Liste Adı"
                value={newWatchlistName}
                onChange={(e) => setNewWatchlistName(e.target.value)}
                placeholder="Örn: İzlenecekler, Favorilerim"
                disabled={submitting}
              />
              <div className={styles.modalActions}>
                <Button
                  onClick={() => setShowModal(false)}
                  variant="secondary"
                  disabled={submitting}
                >
                  İptal
                </Button>
                <Button
                  onClick={handleCreateWatchlist}
                  variant="primary"
                  disabled={submitting}
                >
                  {submitting ? "Oluşturuluyor..." : "Oluştur"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div
            className={styles.modalOverlay}
            onClick={() => setShowDeleteModal(false)}
          >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h2 className={styles.modalTitle}>Listeyi Sil</h2>
              <p className={styles.modalText}>
                Bu izleme listesini silmek istediğinize emin misiniz? Bu işlem
                geri alınamaz.
              </p>
              <div className={styles.modalActions}>
                <Button
                  onClick={() => setShowDeleteModal(false)}
                  variant="secondary"
                  disabled={deleting}
                >
                  İptal
                </Button>
                <Button
                  onClick={handleDeleteWatchlist}
                  variant="danger"
                  disabled={deleting}
                >
                  {deleting ? "Siliniyor..." : "Sil"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

export default WatchlistPage;
