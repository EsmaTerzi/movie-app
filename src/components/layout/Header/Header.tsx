'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { FaFilm, FaUser, FaSignOutAlt } from 'react-icons/fa';
import styles from './Header.module.css';
import { UserRole } from '@/types/enum';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <FaFilm />
          <span>Film Keşif</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/movies" className={styles.navLink}>
            Filmler
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/watchlist" className={styles.navLink}>
                İzleme Listem
              </Link>
              {user?.role === UserRole.ROLE_ADMIN && (
                <Link href="/dashboard" className={styles.navLink}>
                  Admin Paneli
                </Link>
              )}
              <Link href="/profile" className={styles.navLink}>
                <FaUser />
                <span>{user?.username}</span>
              </Link>
              <button onClick={logout} className={styles.logoutBtn}>
                <FaSignOutAlt />
                <span>Çıkış</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={styles.navLink}>
                Giriş Yap
              </Link>
              <Link href={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/register`} className={styles.btnPrimary}>
                Kayıt Ol
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
