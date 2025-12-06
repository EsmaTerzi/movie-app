import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          © {currentYear} Film Keşif Platformu. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
