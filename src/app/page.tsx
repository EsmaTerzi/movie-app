"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import MovieList from "@/components/movies/MovieList/MovieList";
import { movieService } from "@/services/movie.service";
import { Movie } from "@/types";
import styles from "./page.module.css";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const movies = await movieService.getAllMovies();
        setMovies(movies);
      } catch (error) {
        console.error("Filmler yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Film Keşif Platformuna Hoş Geldiniz
        </h1>
        <p className={styles.heroDescription}>
          Binlerce film arasından beğendiklerinizi keşfedin, değerlendirin ve
          görüşlerinizi paylaşın.
        </p>
        <div className={styles.heroActions}>
          <Link href="/movies" className={styles.btnPrimary}>
            Filmleri Keşfet
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
        <MovieList movies={movies} loading={loading} />
      </section>
    </div>
  );
}
