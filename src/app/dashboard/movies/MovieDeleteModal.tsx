import React from "react";
import Button from "@/components/common/Button";
import { Movie } from "@/types";
import styles from "./page.module.css";

interface MovieDeleteModalProps {
  open: boolean;
  onClose: () => void;
  submitting: boolean;
  onSubmit: () => void;
  selectedMovie: Movie | null;
}

const MovieDeleteModal: React.FC<MovieDeleteModalProps> = ({
  open,
  onClose,
  submitting,
  onSubmit,
  selectedMovie,
}) => {
  if (!open || !selectedMovie) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalSmall} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Filmi Sil</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>
            <strong>{selectedMovie.title}</strong> adlı filmi silmek istediğinize emin misiniz?
          </p>
        </div>
        <div className={styles.modalFooter}>
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            İptal
          </Button>
          <Button variant="danger" onClick={onSubmit} loading={submitting}>
            Sil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieDeleteModal;
