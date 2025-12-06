'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MovieList from '@/components/movies/MovieList/MovieList';
import { movieService } from '@/services/movie.service';
import { Movie } from '@/types';
import styles from './page.module.css';

export default function HomePage() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const movies = await movieService.getPopularMovies(8);
        setPopularMovies(movies);
      } catch (error) {
        console.error('Filmler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Film Keşif Platformuna Hoş Geldiniz</h1>
        <p className={styles.heroDescription}>
          Binlerce film arasından beğendiklerinizi keşfedin, değerlendirin ve
          görüşlerinizi paylaşın.
        </p>
        <div className={styles.heroActions}>
          <Link href="/movies" className={styles.btnPrimary}>
            Filmleri Keşfet
          </Link>
          <Link href="/auth/register" className={styles.btnSecondary}>
            Üye Ol
          </Link>
        </div>
      </section>

      <section className={styles.popularSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Popüler Filmler</h2>
          <Link href="/movies" className={styles.viewAll}>
            Tümünü Gör →
          </Link>
        </div>
        <MovieList movies={popularMovies} loading={loading} />
      </section>
    </div>
  );
}
