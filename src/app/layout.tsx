'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { NotificationContainer } from '@/components/common/Notification';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <html lang="tr">
      <head>
        <title>Film Keşif Platformu</title>
        <meta name="description" content="Binlerce film arasından beğendiklerinizi keşfedin, değerlendirin ve görüşlerinizi paylaşın." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <NotificationProvider>
          <AuthProvider>
            <NotificationContainer />
            <div className="app-container">
              <Header />
              <main className="main-content">{children}</main>
              {!isDashboard && <Footer />}
            </div>
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
