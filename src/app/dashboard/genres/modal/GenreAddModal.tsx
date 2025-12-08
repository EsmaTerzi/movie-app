import React, { use, useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import styles from "../page.module.css";
import { adminService } from "@/services/admin.service";
import { useNotification } from "@/contexts/NotificationContext";

interface GenreAddModalProps {
  open: boolean;
  onClose: () => void;
  fetchGenres: () => Promise<void>;
}

const GenreAddModal: React.FC<GenreAddModalProps> = ({ 
  open, 
  onClose, 
  fetchGenres 
}) => {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const {success,error} = useNotification();

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      await adminService.createGenre({ name: name.trim() });
      await fetchGenres();
      success("Tür başarıyla eklendi");
      setName("");
      onClose();
    } catch (error) {
      console.error("Tür eklenirken hata:", error);
      error("Tür eklenirken bir hata oluştu");  
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalSmall} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Yeni Tür Ekle</h2>
          <button className={styles.closeBtn} onClick={handleClose}>✕</button>
        </div>
        <div className={styles.modalBody}>
          <Input
            label="Tür Adı *"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Örn: Dram, Aksiyon, Komedi"
            fullWidth
            required
          />
        </div>
        <div className={styles.modalFooter}>
          <Button variant="secondary" onClick={handleClose} disabled={submitting}>İptal</Button>
          <Button onClick={handleSubmit} loading={submitting} disabled={!name.trim()}>Kaydet</Button>
        </div>
      </div>
    </div>
  );
};

export default GenreAddModal;
