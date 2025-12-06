'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUsers, FaFilm, FaComments, FaTags, FaBookmark, FaChartBar } from 'react-icons/fa';
import styles from './layout.module.css';

const menuItems = [
  { href: '/dashboard', label: 'Genel Bakış', icon: FaChartBar },
  { href: '/dashboard/users', label: 'Kullanıcılar', icon: FaUsers },
  { href: '/dashboard/movies', label: 'Filmler', icon: FaFilm },
  { href: '/dashboard/reviews', label: 'Değerlendirmeler', icon: FaComments },
  { href: '/dashboard/genres', label: 'Türler', icon: FaTags },
  { href: '/dashboard/watchlist', label: 'İzleme Listeleri', icon: FaBookmark },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.dashboardLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Paneli</h2>
        </div>
        <nav className={styles.sidebarNav}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <Icon className={styles.navIcon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
