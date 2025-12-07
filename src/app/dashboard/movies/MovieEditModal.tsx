import React from "react";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import { Genre, Movie } from "@/types";
import styles from "./page.module.css";

interface MovieEditModalProps {
  open: boolean;
  onClose: () => void;
  genres: Genre[];
  formData: any;
  setFormData: (data: any) => void;
  submitting: boolean;
  onSubmit: () => void;
  handleGenreToggle: (genreId: number) => void;
  selectedMovie: Movie | null;
}

const MovieEditModal: React.FC<MovieEditModalProps> = ({
  open,
  onClose,
  genres,
  formData,
  setFormData,
  submitting,
  onSubmit,
  handleGenreToggle,
  selectedMovie,
}) => {
  if (!open || !selectedMovie) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalLarge} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Film Düzenle</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <Input
              label="Film Adı *"
              value={formData.title ?? ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Örn: The Shawshank Redemption"
              fullWidth
              required
            />
          </div>
          <div className={styles.formGroup}>
            <Textarea
              label="Film Açıklaması *"
              value={formData.overview ?? ""}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              placeholder="Film hakkında kısa bir açıklama..."
              rows={4}
              fullWidth
              required
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <Input
                label="Yönetmen *"
                value={formData.director ?? ""}
                onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                placeholder="Örn: Frank Darabont"
                fullWidth
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                label="Yayın Yılı *"
                type="number"
                value={formData.releaseYear !== undefined && formData.releaseYear !== null ? formData.releaseYear.toString() : ""}
                onChange={(e) => setFormData({ ...formData, releaseYear: e.target.value })}
                placeholder="2024"
                fullWidth
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <Input
                label="Süre (dakika) *"
                type="number"
                value={formData.duration !== undefined && formData.duration !== null ? formData.duration.toString() : ""}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                placeholder="120"
                fullWidth
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                label="Poster URL *"
                value={formData.posterUrl ?? ""}
                onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                placeholder="https://example.com/poster.jpg"
                fullWidth
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Film Türleri *</label>
            <div className={styles.genreGrid}>
              {genres.map((genre) => (
                <label key={genre.id} className={styles.genreCheckbox}>
                  <input
                    type="checkbox"
                    checked={Array.isArray(formData.genresIds) && formData.genresIds.includes(parseInt(genre.id))}
                    onChange={() => handleGenreToggle(parseInt(genre.id))}
                  />
                  <span>{genre.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            İptal
          </Button>
          <Button onClick={onSubmit} loading={submitting}>
            Güncelle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieEditModal;
