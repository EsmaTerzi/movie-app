import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { Notification as NotificationType } from '@/contexts/NotificationContext';
import styles from './Notification.module.css';

interface NotificationProps {
  notification: NotificationType;
  onClose: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({ notification, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationCircle />;
      case 'warning':
        return <FaExclamationCircle />;
      case 'info':
        return <FaInfoCircle />;
      default:
        return <FaInfoCircle />;
    }
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  };

  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div
      className={`${styles.notification} ${styles[notification.type]} ${
        isExiting ? styles.exit : ''
      }`}
    >
      <div className={styles.icon}>{getIcon()}</div>
      <div className={styles.message}>{notification.message}</div>
      <button className={styles.closeButton} onClick={handleClose}>
        <FaTimes />
      </button>
    </div>
  );
};

export default Notification;
